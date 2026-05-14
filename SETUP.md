# 🏋️ FitAI Trainer — Complete Setup Guide

> **AI-powered fitness trainer with real-time pose estimation, rep counting, and form scoring.**

---

## 📋 Table of Contents

1. [System Requirements](#1-system-requirements)
2. [Install Visual Studio Build Tools](#2-install-visual-studio-build-tools)
3. [Install Python (Exact Version)](#3-install-python-exact-version)
4. [Install VS Code](#4-install-vs-code)
5. [Clone / Download the Project](#5-clone--download-the-project)
6. [Project Folder Structure](#6-project-folder-structure)
7. [Create & Activate Virtual Environment](#7-create--activate-virtual-environment)
8. [Install Dependencies](#8-install-dependencies)
9. [Download Sample Video Datasets](#9-download-sample-video-datasets)
10. [Run the Application](#10-run-the-application)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| **OS** | Windows 10 (64-bit) | Windows 11 (64-bit) |
| **Python** | 3.9.x | **3.10.x** ✅ |
| **RAM** | 4 GB | 8 GB+ |
| **Storage** | 3 GB free | 5 GB+ free |
| **Webcam** | Any USB or built-in | 720p+ |
| **CPU** | Intel i5 / Ryzen 5 | Intel i7 / Ryzen 7 |
| **GPU** | Not required | NVIDIA (optional) |

> ⚠️ **CRITICAL — Python Version:**
> This project uses **MediaPipe 0.10+** which only supports **Python 3.8 – 3.11**.
> **Python 3.12 and above are NOT supported.** Use Python **3.10.x** for best compatibility.

---

## 2. Install Visual Studio Build Tools

MediaPipe and OpenCV require C++ build tools to compile native extensions.

### Windows

1. Go to: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Download **"Build Tools for Visual Studio 2022"**
3. Run the installer
4. In the **Workloads** tab, check:
   - ✅ **Desktop development with C++**
5. In the **Individual components** tab, also check:
   - ✅ **MSVC v143 build tools**
   - ✅ **Windows 10/11 SDK**
6. Click **Install** (≈ 5–8 GB download)
7. **Restart your PC** after installation

> 💡 If you already have **Visual Studio 2019/2022 (full IDE)** installed, Build Tools are already included.

---

## 3. Install Python (Exact Version)

> ✅ Use **Python 3.10.x** — do NOT use 3.12+

### Step-by-step

1. Go to: https://www.python.org/downloads/release/python-31011/
2. Scroll down to **"Files"** section
3. Download: **`Windows installer (64-bit)`** → `python-3.10.11-amd64.exe`
4. Run the installer
5. ✅ Check **"Add Python 3.10 to PATH"** at the bottom
6. Click **"Install Now"**

### Verify installation

Open **Command Prompt** (Win + R → `cmd`) and run:

```cmd
python --version
```

Expected output:
```
Python 3.10.11
```

```cmd
pip --version
```

Expected output:
```
pip 23.x.x from ... (python 3.10)
```

---

## 4. Install VS Code

> Recommended editor for this project.

1. Go to: https://code.visualstudio.com/
2. Download **"User Installer" for Windows (64-bit)**
3. Run the installer, check all options:
   - ✅ Add to PATH
   - ✅ Register Code as an editor for supported file types
   - ✅ Add "Open with Code" to context menu
4. Install these VS Code Extensions after opening:

| Extension | Publisher | Purpose |
|---|---|---|
| **Python** | Microsoft | Python language support |
| **Pylance** | Microsoft | Type checking & IntelliSense |
| **Python Debugger** | Microsoft | Debugging |

---

## 5. Clone / Download the Project

### Option A — Download ZIP (No Git needed)

1. Download the project ZIP file
2. Extract to a folder e.g.: `C:\Projects\fitai-trainer\`
3. Open VS Code → File → Open Folder → select `fitai-trainer`

### Option B — Git Clone

If you have Git installed:

```cmd
git clone <your-repo-url> fitai-trainer
cd fitai-trainer
```

### Rename the folder (recommended)

Rename the extracted folder from `fitness-trainer-pose-estimation` to `fitai-trainer` for a cleaner path.

---

## 6. Project Folder Structure

```
fitai-trainer/
│
├── 📄 app.py                        ← Flask server (entry point)
├── 📄 video_processor.py            ← Subprocess-based video analysis
├── 📄 test_engine.py                ← Unit tests for exercise engine
├── 📄 requirements.txt              ← Python dependencies
├── 📄 SETUP.md                      ← This file
├── 📄 README.md                     ← Project documentation
├── 📄 .gitignore
│
├── 📁 exercises/                    ← Exercise engine (core logic)
│   ├── 📄 base_exercise.py          ← FSM: state machine + rep counter
│   ├── 📄 engine.py                 ← High-level exercise API
│   ├── 📄 loader.py                 ← YAML parser & validator
│   └── 📁 definitions/              ← 18 YAML exercise configs
│       ├── squat.yaml
│       ├── push_up.yaml
│       ├── hammer_curl.yaml
│       ├── bicep_curl.yaml
│       ├── tricep_dip.yaml
│       ├── shoulder_press.yaml
│       ├── lateral_raise.yaml
│       ├── lunge.yaml
│       ├── side_lunge.yaml
│       ├── deadlift.yaml
│       ├── glute_bridge.yaml
│       ├── calf_raise.yaml
│       ├── wall_sit.yaml
│       ├── plank.yaml
│       ├── mountain_climber.yaml
│       ├── high_knees.yaml
│       ├── jumping_jack.yaml
│       └── leg_raise.yaml
│
├── 📁 pose_estimation/              ← MediaPipe wrapper
│   ├── 📄 estimation.py             ← PoseEstimator class
│   └── 📄 angle_calculation.py      ← Joint angle math
│
├── 📁 feedback/                     ← UI feedback components
│   ├── 📄 indicators.py
│   ├── 📄 information.py
│   └── 📄 layout.py
│
├── 📁 utils/                        ← Shared utilities
│   └── 📄 draw_text_with_background.py
│
├── 📁 db/                           ← Data persistence
│   └── 📄 workout_logger.py         ← SQLite workout history
│
├── 📁 templates/                    ← Jinja2 HTML templates
│   ├── 📄 index.html                ← Live trainer (home)
│   ├── 📄 dashboard.html            ← Stats & charts
│   ├── 📄 video_analysis.html       ← Video upload & analysis
│   └── 📄 profile.html             ← User profile & settings
│
├── 📁 static/                       ← Frontend assets
│   ├── 📁 css/
│   │   ├── 📄 style.css             ← Global dark theme
│   │   ├── 📄 dashboard.css         ← Dashboard styles
│   │   ├── 📄 profile.css           ← Profile styles
│   │   └── 📄 video_analysis.css    ← Video page styles
│   ├── 📁 js/
│   │   ├── 📄 script.js             ← Live trainer logic
│   │   ├── 📄 dashboard.js          ← Chart updates
│   │   ├── 📄 profile.js            ← Profile + modals
│   │   └── 📄 video_analysis.js     ← Video upload & analysis
│   └── 📁 images/                   ← Static image assets
│
├── 📁 data/                         ← Sample/test videos (add yours here)
├── 📁 output/                       ← Processed video output
└── 📁 uploads/                      ← Temp upload folder (auto-created)
```

---

## 7. Create & Activate Virtual Environment

> A virtual environment isolates this project's packages from your system Python.
> **Always use venv — never install directly to system Python.**

### Open a terminal in VS Code

Press `` Ctrl + ` `` (backtick) to open the integrated terminal.

### Create the virtual environment

```cmd
python -m venv venv
```

This creates a `venv/` folder inside your project directory.

### Activate the virtual environment

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
```

> If PowerShell shows an execution policy error, run:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Then try activating again.

### Confirm activation

Your terminal prompt should now show `(venv)` at the start:

```
(venv) C:\Projects\fitai-trainer>
```

Verify it's using the right Python:
```cmd
python --version
```
```
Python 3.10.11
```

---

## 8. Install Dependencies

With your `(venv)` active, install all packages:

```cmd
pip install --upgrade pip
pip install -r requirements.txt
```

This installs:

| Package | Version | Purpose |
|---|---|---|
| `flask` | ≥ 2.0.0 | Web server & routing |
| `opencv-python` | ≥ 4.5.0 | Webcam capture & frame processing |
| `mediapipe` | ≥ 0.10.0 | Pose landmark detection |
| `numpy` | ≥ 1.21.0 | Array & math operations |
| `pyyaml` | ≥ 6.0.0 | Exercise YAML config parsing |
| `imageio` | ≥ 2.31.0 | Video I/O |
| `imageio-ffmpeg` | ≥ 0.4.8 | H.264 encoding for browser videos |

> ⏳ First install takes 3–5 minutes. MediaPipe downloads ~100 MB of model files.

### Verify installation

```cmd
python -c "import mediapipe; import cv2; import flask; print('All OK')"
```

Expected:
```
All OK
```

---

## 9. Download Sample Video Datasets

You can test the **Video Analysis** feature with pre-recorded workout videos.

### Free workout video sources

| Source | Link | Format |
|---|---|---|
| **Pexels** (free) | https://www.pexels.com/search/videos/exercise/ | MP4 |
| **Pixabay** (free) | https://pixabay.com/videos/search/workout/ | MP4 |
| **UCF-101 Dataset** | https://www.crcv.ucf.edu/data/UCF101.php | AVI/MP4 |
| **NTU RGB+D** | https://rose1.ntu.edu.sg/dataset/actionRecognition/ | MP4 |

### Recommended test videos

Download short clips (10–30 seconds) of:
- ✅ Squats (front or side view)
- ✅ Push-ups (side view)
- ✅ Bicep curls (front view)
- ✅ Lunges (side view)

### Where to place videos

```
fitai-trainer/
└── 📁 data/
    ├── squat_test.mp4
    ├── pushup_test.mp4
    └── curl_test.mp4
```

### Video requirements for best accuracy

| Setting | Recommended |
|---|---|
| **Resolution** | 720p (1280×720) or higher |
| **FPS** | 24–60 fps |
| **Format** | MP4 (H.264) |
| **Duration** | 10–120 seconds |
| **Max file size** | 50 MB |
| **Camera angle** | Side view (best) or front view |
| **Lighting** | Well-lit, no strong backlight |
| **Background** | Plain / minimal clutter |
| **Clothing** | Fitted — avoid loose/baggy clothes |

---

## 10. Run the Application

### Start the server

Make sure your venv is active, then:

```cmd
python app.py
```

You should see:
```
==================================================
🏋️ FITNESS TRAINER WITH POSE ESTIMATION
==================================================
📋 Available exercises: 18
   • squat
   • push_up
   • hammer_curl
   ...
--------------------------------------------------
🌐 Open http://127.0.0.1:5000 in your browser
==================================================
```

### Open in browser

Navigate to: **http://127.0.0.1:5000**

| Page | URL | Purpose |
|---|---|---|
| **Live Trainer** | http://127.0.0.1:5000/ | Real-time webcam exercise tracking |
| **Video Analysis** | http://127.0.0.1:5000/video_analysis | Upload & analyze workout videos |
| **Dashboard** | http://127.0.0.1:5000/dashboard | Workout stats & charts |
| **Profile** | http://127.0.0.1:5000/profile | Settings & achievements |

### Test the exercise engine

```cmd
python test_engine.py
```

Expected output: all tests passing.

### Stop the server

Press `Ctrl + C` in the terminal.

---

## 11. Troubleshooting

### ❌ `mediapipe` install fails

```
error: Microsoft Visual C++ 14.0 or greater is required
```

**Fix:** Install Visual Studio Build Tools (see Step 2).

---

### ❌ `ModuleNotFoundError: No module named 'cv2'`

**Fix:** Make sure venv is activated before running:
```cmd
venv\Scripts\activate
pip install opencv-python
```

---

### ❌ Camera not detected

```
[ERROR] Camera could not be opened.
```

**Fix:**
1. Check webcam is connected and not used by another app (Teams, Zoom, etc.)
2. Try a different camera index in `app.py` line ~97:
   ```python
   camera = cv2.VideoCapture(1)  # try 1 instead of 0
   ```

---

### ❌ `mediapipe` works but pose not detected

- Ensure you are **fully visible** in the frame (head to knees minimum)
- Improve lighting — face a window or lamp
- Wear **fitted clothing** — baggy clothes confuse the model

---

### ❌ Video analysis stuck at 0%

- Video file may be corrupted — try a different MP4
- Ensure `imageio-ffmpeg` installed: `pip install imageio-ffmpeg`
- File size must be < 50 MB and duration < 2 minutes

---

### ❌ PowerShell `Activate.ps1` blocked

```
cannot be loaded because running scripts is disabled
```

**Fix:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### ❌ Port 5000 already in use

```
Address already in use
```

**Fix:** Kill the existing process:
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Or change the port in `app.py` last line:
```python
app.run(debug=False, port=5001)
```

---

## ✅ Quick Start Checklist

```
[ ] Python 3.10.x installed and on PATH
[ ] Visual Studio Build Tools 2022 installed
[ ] VS Code installed with Python extension
[ ] Project folder opened in VS Code
[ ] Virtual environment created (python -m venv venv)
[ ] Virtual environment activated (venv\Scripts\activate)
[ ] Dependencies installed (pip install -r requirements.txt)
[ ] Webcam connected and working
[ ] python app.py runs without errors
[ ] http://127.0.0.1:5000 opens in browser
```

---

## 📞 Support

If you hit an issue not listed here:

1. Check the terminal output for the exact error message
2. Search the error on [Stack Overflow](https://stackoverflow.com)
3. Check [MediaPipe GitHub Issues](https://github.com/google/mediapipe/issues)
4. Check [OpenCV GitHub](https://github.com/opencv/opencv-python)

---

*Made with ❤️ — FitAI Trainer*
