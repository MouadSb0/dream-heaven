# Setup Training Environment for DreamHaven AI Architect

Write-Host "Setting up Python environment for AI training..." -ForegroundColor Cyan

# 1. Create a virtual environment if it doesn't exist
if (!(Test-Path -Path ".venv_ai")) {
    Write-Host "Creating virtual environment '.venv_ai'..." -ForegroundColor Yellow
    python -m venv .venv_ai
}

# 2. Activate the environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .venv_ai\Scripts\Activate.ps1

# 3. Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# 4. Install Unsloth & Dependencies
# Note: Unsloth installation on Windows can be tricky. 
# We follow the official recommendation for local installation.
Write-Host "Installing Unsloth and training dependencies..." -ForegroundColor Yellow

# Install pytorch with CUDA support (assuming CUDA is installed)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install Unsloth
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"

# Install other requirements
pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes datasets transformers

Write-Host "------------------------------------------------" -ForegroundColor Green
Write-Host "Setup Complete! To start training, run:" -ForegroundColor Green
Write-Host "  & .venv_ai\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "  python src/ai/train_ai_architect.py" -ForegroundColor Cyan
