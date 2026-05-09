# --- PASTE THIS INTO A GOOGLE COLAB NOTEBOOK (WITH T4 GPU) ---
# 1. Click 'Runtime' -> 'Change runtime type' -> Select 'T4 GPU'
# 2. Upload your 'lora_dataset.jsonl' using the file icon on the left sidebar.

# 1. Install Unsloth and dependencies (Required every time in Colab)
try:
    import unsloth
except ImportError:
    !pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
    !pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes

from unsloth import FastLanguageModel
import torch
import os
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# 2. Configuration
MODEL_NAME = "unsloth/llama-3-8b-bnb-4bit"
MAX_SEQ_LENGTH = 2048

# 3. Load Model and Tokenizer
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = MODEL_NAME,
    max_seq_length = MAX_SEQ_LENGTH,
    load_in_4bit = True,
)

# 4. Add LoRA adapters
model = FastLanguageModel.get_peft_model(
    model,
    r = 16,
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                     "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = "unsloth",
    random_state = 3407,
)

# 5. Format Dataset (Uses the uploaded 'lora_dataset.jsonl')
def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    inputs       = examples["input"]
    outputs      = examples["output"]
    texts = []
    for instruction, input, output in zip(instructions, inputs, outputs):
        text = f"### Instruction:\n{instruction}\n\n### Input:\n{input}\n\n### Response:\n{output}"
        texts.append(text)
    return { "text" : texts, }

if not os.path.exists("lora_dataset.jsonl"):
    print("❌ ERROR: 'lora_dataset.jsonl' NOT FOUND. Please upload it via the left sidebar.")
else:
    dataset = load_dataset("json", data_files="lora_dataset.jsonl", split="train")
    dataset = dataset.map(formatting_prompts_func, batched = True,)

    # 6. Initialize Trainer
    trainer = SFTTrainer(
        model = model,
        tokenizer = tokenizer,
        train_dataset = dataset,
        dataset_text_field = "text",
        max_seq_length = MAX_SEQ_LENGTH,
        dataset_num_proc = 2,
        packing = False,
        args = TrainingArguments(
            per_device_train_batch_size = 2,
            gradient_accumulation_steps = 4,
            warmup_steps = 5,
            max_steps = 60,
            learning_rate = 2e-4,
            fp16 = not torch.cuda.is_bf16_supported(),
            bf16 = torch.cuda.is_bf16_supported(),
            logging_steps = 1,
            optim = "adamw_8bit",
            weight_decay = 0.01,
            lr_scheduler_type = "linear",
            seed = 3407,
            output_dir = "outputs",
        ),
    )

    # 7. Execute Training
    print("🚀 Starting fine-tuning...")
    trainer_stats = trainer.train()
    print("✅ Training complete!")

    # 8. Save the model to Google Drive or local folder
    model.save_pretrained_gguf("model", tokenizer, quantization_method = "q4_k_m")
    print("Model saved to 'model' folder in GGUF format.")
