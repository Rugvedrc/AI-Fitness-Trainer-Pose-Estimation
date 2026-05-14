# 🏋️ FitAI Trainer — AI Pose Estimation & Exercise Tracker

> An AI-powered web application that tracks your exercises in real-time using computer vision and provides instant form feedback with scoring.

![Python](https://img.shields.io/badge/Python-3.10.x-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.x-green.svg)
![MediaPipe](https://img.shields.io/badge/MediaPipe-0.10.x-orange.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-4.5%2B-red.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

> ⚠️ **Python 3.10.x required.** MediaPipe 0.10.x does **not** support Python 3.12+.
> See [SETUP.md](SETUP.md) for full installation guide.

---

## ✨ Features

### 🎥 Real-time Exercise Tracking
- 📷 **Live Pose Estimation** using Google MediaPipe
- 🎯 **18 Built-in Exercises** — full body coverage
- 📊 **Form Score System** (0–100) with A–F grading
- 🔄 **Automatic Rep Counting** via state machine logic
- 💬 **Real-time Form Feedback** — instant correction tips

### 📹 Video Analysis Mode
- 🎬 **Upload & Analyze Videos** — process pre-recorded workouts
- 🦴 **Skeleton Overlay** — pose detection visualized on video
- 📈 **Live Statistics Panel** — rep count, form score, state
- 🖥️ **Processing Terminal** — detailed analysis progress logs
- 💾 **H.264 Video Output** — browser-compatible via imageio-ffmpeg

### 👤 User Profile
- 📋 Personal information & fitness tracking
- 🎯 Customizable weekly/daily goals
- 🏅 Achievement badge system
- 📊 Activity charts (Chart.js)
- ❤️ Favourite exercise tracking
- ⚙️ App settings (units, sounds, notifications)

### 📊 Dashboard
- 📈 Total workouts, reps, streak counter
- 📉 Weekly activity bar chart
- 🥧 Exercise distribution doughnut chart
- 📋 Recent workout history table

---

## 🚀 Quick Start

> **Full guide:** See [SETUP.md](SETUP.md)

```bash
# 1. Requires Python 3.10.x
python --version   # must show 3.10.x

# 2. Create virtual environment
python -m venv venv

# 3. Activate (Windows CMD)
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run
python app.py
```

Open **http://127.0.0.1:5000** in your browser.

---

## 📁 Project Structure

```
fitai-trainer/
│
├── 📄 app.py                        ← Flask server (entry point)
├── 📄 video_processor.py            ← Subprocess video analysis engine
├── 📄 test_engine.py                ← Exercise engine unit tests
├── 📄 requirements.txt              ← Python dependencies
├── 📄 SETUP.md                      ← Full installation guide
├── 📄 README.md                     ← This file
├── 📄 .gitignore
│
├── 📁 exercises/                    ← Exercise logic (core)
│   ├── 📄 base_exercise.py          ← FSM + rep counter + form score
│   ├── 📄 engine.py                 ← High-level exercise wrapper
│   ├── 📄 loader.py                 ← YAML → Python object parser
│   └── 📁 definitions/             ← 18 YAML exercise configs
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
│   └── 📄 angle_calculation.py      ← Joint angle mathematics
│
├── 📁 feedback/                     ← UI feedback components
│   ├── 📄 indicators.py
│   ├── 📄 information.py
│   └── 📄 layout.py
│
├── 📁 utils/                        ← Shared utilities
│   └── 📄 draw_text_with_background.py
│
├── 📁 db/                           ← Workout history (SQLite)
│   └── 📄 workout_logger.py
│
├── 📁 templates/                    ← Jinja2 HTML pages
│   ├── 📄 index.html                ← Live trainer (home)
│   ├── 📄 dashboard.html            ← Stats & charts
│   ├── 📄 video_analysis.html       ← Video upload & analysis
│   └── 📄 profile.html              ← User profile & settings
│
├── 📁 static/                       ← Frontend assets
│   ├── 📁 css/
│   │   ├── 📄 style.css             ← Global dark theme
│   │   ├── 📄 dashboard.css
│   │   ├── 📄 profile.css
│   │   └── 📄 video_analysis.css
│   ├── 📁 js/
│   │   ├── 📄 script.js             ← Live trainer
│   │   ├── 📄 dashboard.js          ← Chart updates
│   │   ├── 📄 profile.js            ← Profile + modals
│   │   └── 📄 video_analysis.js     ← Video analysis
│   └── 📁 images/
│
├── 📁 data/                         ← Place test videos here
├── 📁 output/                       ← Processed video output
└── 📁 uploads/                      ← Temp uploads (auto-created)
```

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│                  FRONTEND (Browser)                   │
│   index.html ← MJPEG stream ← form feedback           │
└───────────────────────────┬──────────────────────────┘
                            │ HTTP REST
┌───────────────────────────▼──────────────────────────┐
│                  BACKEND (Flask)                       │
│                     app.py                             │
│   • MJPEG video streaming    • REST API endpoints      │
│   • Session management       • Video upload handling   │
└───────────────────────────┬──────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────┐
│                 EXERCISE ENGINE                        │
│   BaseExercise (FSM) → Loader (YAML) → Engine (API)   │
│   • State machine  • Rep counter  • Form scorer        │
│   • BilateralExercise (L/R)  • DurationExercise (hold)│
└───────────────────────────┬──────────────────────────┘
                            │ loads
┌───────────────────────────▼──────────────────────────┐
│            YAML DEFINITIONS (18 exercises)             │
│   Each defines: angles · states · counter · feedback  │
│   tempo · visualization — NO code changes needed!     │
└──────────────────────────────────────────────────────┘
```

---

## 📊 Form Score System

| Component | Weight | Description |
|---|---|---|
| Angle Accuracy | 40% | How close your angles are to ideal |
| Tempo Compliance | 30% | Following recommended movement speed |
| Form Feedback | 30% | Penalty for triggered form warnings |

| Score | Grade |
|---|---|
| 90–100 | 🟢 A |
| 80–89 | 🔵 B |
| 70–79 | 🟡 C |
| 60–69 | 🟠 D |
| 0–59 | 🔴 F |

---

## 💪 Available Exercises (18)

| Category | Exercises |
|---|---|
| **Upper Body** | Hammer Curl, Bicep Curl, Tricep Dip, Shoulder Press, Lateral Raise, Push Up |
| **Lower Body** | Squat, Lunge, Side Lunge, Deadlift, Glute Bridge, Calf Raise, Wall Sit |
| **Cardio / Core** | Mountain Climber, High Knees, Jumping Jack, Leg Raise, Plank |

---

## ➕ Adding New Exercises

No code required — just add a YAML file to `exercises/definitions/`:

```yaml
# exercises/definitions/my_exercise.yaml
name: "My Exercise"
type: "standard"        # standard | bilateral | duration
description: "Brief description"

angles:
  primary_angle:
    landmarks: [11, 13, 15]   # MediaPipe landmark IDs
    range: [30, 170]

states:
  - name: "START"
    condition: { angle: "primary_angle", operator: ">", value: 150 }
    next_state: "MIDDLE"

  - name: "MIDDLE"
    condition: { angle: "primary_angle", operator: "<", value: 60 }
    next_state: "END"

  - name: "END"
    condition: { angle: "primary_angle", operator: ">", value: 150 }
    next_state: "START"

counter:
  increment_on: "END"

tempo:
  up_seconds: 1.0
  down_seconds: 2.0

visualization:
  primary_angle: "primary_angle"
  show_angles: ["primary_angle"]
  highlight_landmarks: [11, 13, 15]
```

Restart the app — your exercise appears automatically!

---

## 🔌 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Home — live exercise tracking |
| `/video_analysis` | GET | Video upload & analysis |
| `/dashboard` | GET | Workout statistics |
| `/profile` | GET | User profile & settings |
| `/video_feed` | GET | MJPEG video stream |
| `/start_exercise` | POST | Start exercise session |
| `/stop_exercise` | POST | Stop current session |
| `/get_status` | GET | Rep count & form score |
| `/exercises` | GET | List all 18 exercises |
| `/stop_camera` | POST | Release camera |
| `/api/video/upload` | POST | Upload video for analysis |
| `/api/video/status/<id>` | GET | Analysis progress |
| `/api/video/processed/<id>` | GET | Download processed video |
| `/api/profile/update` | POST | Save profile data |

---

## 📍 MediaPipe Landmark IDs

```
 0  = NOSE
11  = LEFT_SHOULDER     12 = RIGHT_SHOULDER
13  = LEFT_ELBOW        14 = RIGHT_ELBOW
15  = LEFT_WRIST        16 = RIGHT_WRIST
23  = LEFT_HIP          24 = RIGHT_HIP
25  = LEFT_KNEE         26 = RIGHT_KNEE
27  = LEFT_ANKLE        28 = RIGHT_ANKLE
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.10, Flask 2.x |
| **Pose AI** | Google MediaPipe 0.10 |
| **Vision** | OpenCV 4.5+ |
| **Video** | imageio + imageio-ffmpeg (H.264) |
| **Config** | PyYAML |
| **Frontend** | HTML5, Vanilla CSS, Vanilla JS |
| **Charts** | Chart.js (CDN) |

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) by Google
- [OpenCV](https://opencv.org/) community
- [Flask](https://flask.palletsprojects.com/) framework

---

*Made with ❤️ — FitAI Trainer*
