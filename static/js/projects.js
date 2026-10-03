/*
 * Project data for the TUT Vision showcase page.
 *
 * To add a project, append an object to PROJECTS. Media files live in
 * static/media/ (keep looping clips short, H.264 MP4, <= 1280 px wide).
 *
 * Fields
 *   id          anchor id (unique, url-safe)
 *   theme       key of THEMES below
 *   year        number, used for sorting inside a theme
 *   venue       short venue / status label shown as a tag
 *   title       full title
 *   short       acronym or short name shown on the overview wall
 *   authors     [{ name, url?, mark? }]  mark: "*" equal contribution etc.
 *   supervisor  "kamarainen" | "rahtu"
 *   links       { paper, arxiv, page, code, video, data, models }
 *   media       { type: "video" | "image", src, poster? }   main looping clip
 *   tldr        one-line takeaway
 *   abstractLabel  heading for the text block ("Abstract" by default)
 *   abstract    [paragraph, ...]
 *   highlights  optional [string, ...]
 *   gallery     optional [{ type, src, poster?, caption, portrait? }]
 *   youtube     optional [{ id, title }]
 */

const PEOPLE = {
  kamarainen: {
    name: "Joni-Kristian Kämäräinen",
    url: "https://webpages.tuni.fi/vision/public_pages/JoniKamarainen/index.html",
  },
  rahtu: { name: "Esa Rahtu", url: "https://esa.rahtu.fi/" },
  suomela: { name: "Lauri Suomela", url: "https://lasuomela.github.io/" },
  kuruppu: {
    name: "Sasanka Kuruppu Arachchige",
    url: "https://sasakuruppuarachchi.github.io/",
  },
  torres: { name: "German F. Torres", url: "https://germanftv.github.io/" },
  cai: { name: "Dingding Cai", url: "https://dingdingcai.github.io/" },
  ren: { name: "Xuqian Ren", url: "https://xuqianren.github.io/" },
  yang: { name: "Wenyan Yang", url: "https://uenian33.github.io/" },
};

const P = (key, mark) => ({ ...PEOPLE[key], mark });
const A = (name, url, mark) => ({ name, url, mark });

const THEMES = {
  navigation: {
    label: "Robot Navigation",
    icon: "fa-route",
    blurb:
      "Learning visual navigation policies that work in the real world: from crowd-sourced data at planetary scale to sim-to-real transfer and place recognition.",
  },
  aerial: {
    label: "Aerial Robotics",
    icon: "fa-helicopter",
    blurb:
      "Open, agile aerial platforms and physics-aware state estimation for drones that fly where GPS and cameras fail.",
  },
  "3d": {
    label: "3D Reconstruction & Pose",
    icon: "fa-cube",
    blurb:
      "Gaussian splatting, meshing and 6D object pose estimation from everyday devices such as smartphones.",
  },
  imaging: {
    label: "Video Restoration",
    icon: "fa-film",
    blurb: "Using depth and multi-modal cues to recover sharp video from motion blur.",
  },
};

const SUPERVISORS = {
  kamarainen: PEOPLE.kamarainen,
  rahtu: PEOPLE.rahtu,
};

const PROJECTS = [
  /* ------------------------------------------------------------ navigation */
  {
    id: "navigation-scaling",
    theme: "navigation",
    year: 2026,
    venue: "IEEE RA-L 2026",
    title: "Data Scaling for Navigation in Unknown Environments",
    short: "Navigation Scaling",
    authors: [
      P("suomela"),
      A("Naoki Takahata"),
      P("kuruppu"),
      A("Harry Edelman"),
      P("kamarainen"),
    ],
    supervisor: "kamarainen",
    links: {
      paper: "https://doi.org/10.1109/LRA.2026.3677718",
      arxiv: "https://arxiv.org/abs/2601.09444",
      page: "https://lasuomela.github.io/navigation_scaling/",
      code: "https://github.com/lasuomela/NavigationScaling",
      models: "https://huggingface.co/collections/lauriasuo/frodobots",
    },
    media: {
      type: "video",
      src: "static/media/navscaling_wuhan.mp4",
      poster: "static/media/navscaling_wuhan.jpg",
    },
    tldr:
      "4,565 hours of crowd-sourced driving from 161 locations in 35 countries; 125 km of zero-shot autonomous sidewalk driving in four countries. Data diversity beats data quantity.",
    abstract: [
      "Generalization of imitation-learned navigation policies to environments unseen in training remains a major challenge. We address this by conducting the first large-scale study of how data quantity and data diversity affect real-world generalization in end-to-end, map-free visual navigation. Using a curated 4,565-hour crowd-sourced dataset collected across 161 locations in 35 countries, we train policies for point goal navigation and evaluate their closed-loop control performance on sidewalk robots operating in four countries, covering 125 km of autonomous driving.",
      "Our results show that large-scale training data enables zero-shot navigation in unknown environments, approaching the performance of policies trained with environment-specific demonstrations. Critically, we find that data diversity is far more important than data quantity. Doubling the number of geographical locations in a training set decreases navigation errors by ~15%, while performance benefit from adding data from existing locations saturates with very little data. We also observe that, with noisy crowd-sourced data, simple regression-based models outperform generative and sequence-based architectures.",
    ],
    gallery: [
      {
        type: "video",
        src: "static/media/navscaling_mosaic.mp4",
        poster: "static/media/navscaling_mosaic.jpg",
        caption: "Training data: examples from a subset of the 161 training locations.",
      },
      {
        type: "video",
        src: "static/media/navscaling_kisumu.mp4",
        poster: "static/media/navscaling_kisumu.jpg",
        caption: "Zero-shot deployment in Kisumu, Kenya.",
      },
      {
        type: "video",
        src: "static/media/navscaling_portlouis.mp4",
        poster: "static/media/navscaling_portlouis.jpg",
        caption: "Zero-shot deployment in Port Louis, Mauritius.",
      },
      {
        type: "video",
        src: "static/media/navscaling_selebi.mp4",
        poster: "static/media/navscaling_selebi.jpg",
        caption: "Zero-shot deployment in Selebi-Phikwe, Botswana.",
      },
    ],
    youtube: [
      { id: "6SUp4tYGesY", title: "Full run: Wuhan, China" },
      { id: "yAQTY0YstA0", title: "Full run: Kisumu, Kenya" },
    ],
  },
  {
    id: "faint",
    theme: "navigation",
    year: 2026,
    venue: "ICRA 2026",
    title: "Synthetic vs. Real Training Data for Visual Navigation",
    short: "FAINT",
    authors: [
      P("suomela"),
      P("kuruppu"),
      P("torres"),
      A("Harry Edelman"),
      P("kamarainen"),
    ],
    supervisor: "kamarainen",
    links: {
      arxiv: "https://arxiv.org/abs/2509.11791",
      page: "https://lasuomela.github.io/faint/",
      code: "https://github.com/lasuomela/faint",
      models: "https://huggingface.co/collections/lauriasuo/faint-67b71dbaf71f1b648986f382",
    },
    media: {
      type: "video",
      src: "static/media/faint.mp4",
      poster: "static/media/faint.jpg",
    },
    tldr:
      "A navigation policy trained only in simulation beats its real-data-trained twin by 31% and prior state of the art by 50%, and transfers to a drone without retraining.",
    abstract: [
      "This paper investigates how the performance of visual navigation policies trained in simulation compares to policies trained with real-world data. Performance degradation of simulator-trained policies is often significant when they are evaluated in the real world. However, despite this well-known sim-to-real gap, we demonstrate that simulator-trained policies can match the performance of their real-world-trained counterparts.",
      "Central to our approach is a navigation policy architecture that bridges the sim-to-real appearance gap by leveraging pretrained visual representations and runs real-time on robot hardware. Evaluations on a wheeled mobile robot show that the proposed policy, when trained in simulation, outperforms its real-world-trained version by 31% and the prior state-of-the-art methods by 50% in navigation success rate. Policy generalization is verified by deploying the same model onboard a drone.",
      "Our results highlight the importance of diverse image encoder pretraining for sim-to-real generalization, and identify on-policy learning as a key advantage of simulated training over training with real data.",
    ],
    gallery: [
      {
        type: "image",
        src: "static/media/faint_overview.jpg",
        caption: "Visual abstract: simulator-trained policy deployed on a real robot.",
      },
    ],
    youtube: [{ id: "ow7qDv9u51U", title: "Presentation" }],
  },
  {
    id: "placenav",
    theme: "navigation",
    year: 2024,
    venue: "ICRA 2024",
    title: "PlaceNav: Topological Navigation through Place Recognition",
    short: "PlaceNav",
    authors: [P("suomela"), A("Jussi Kalliola"), A("Harry Edelman"), P("kamarainen")],
    supervisor: "kamarainen",
    links: {
      arxiv: "https://arxiv.org/abs/2309.17260",
      page: "https://lasuomela.github.io/placenav/",
      code: "https://github.com/lasuomela/placenav",
    },
    media: { type: "image", src: "static/media/placenav.webp" },
    tldr:
      "Visual place recognition for subgoal selection makes topological navigation faster and lets it learn from large non-robotics datasets: +76% success indoors, +23% outdoors.",
    abstract: [
      "Recent results suggest that splitting topological navigation into robot-independent and robot-specific components improves navigation performance by enabling the robot-independent part to be trained with data collected by different robot types. However, the navigation methods are still limited by the scarcity of suitable training data and suffer from poor computational scaling.",
      "In this work, we present PlaceNav, which subdivides the robot-independent part into navigation-specific and generic computer vision components. We utilize visual place recognition for the subgoal selection of the topological navigation pipeline. This makes subgoal selection more efficient and enables leveraging large-scale datasets from non-robotics sources, increasing training data availability. Bayesian filtering, enabled by place recognition, further improves navigation performance by increasing the temporal consistency of subgoals.",
      "Our experimental results verify the design and the new model obtains a 76% higher success rate in indoor and 23% higher in outdoor navigation tasks with higher computational efficiency.",
    ],
    youtube: [
      { id: "4dzoRZrBsYw", title: "Navigation examples" },
      { id: "IzP3hlO_C6Y", title: "Presentation" },
    ],
  },
  {
    id: "earthrover-challenge",
    theme: "navigation",
    year: 2025,
    venue: "ICRA 2025 · 2nd place",
    title: "The EarthRover Challenge at ICRA 2025: Runners-up",
    short: "EarthRover Challenge",
    authors: [A("Team Tampere University"), P("kuruppu")],
    supervisor: "kamarainen",
    links: {
      page: "https://sasakuruppuarachchi.github.io/posts.html",
      challenge: "https://earth-rover-challenge.github.io",
    },
    media: {
      type: "video",
      src: "static/media/earthrover.mp4",
      poster: "static/media/earthrover.jpg",
    },
    tldr:
      "Remote urban navigation of robots in cities around the world, over delayed and noisy sensor streams. Our hybrid filter + learned-policy system took 2nd place.",
    abstractLabel: "Overview",
    abstract: [
      "EarthRover is a remote urban navigation competition: robots located in cities across the world are given GPS checkpoints, and teams must control them remotely using delayed and unreliable streams of camera, IMU, GPS and other sensors. Environments and mission difficulty vary (crowds, roads, sidewalks, obstacles), so the goal is to be robust, safe and generalize across seen and unseen conditions.",
      "Our team from Tampere University combined a filter-based heading reference system, which fuses IMU and, when available, magnetometer and GPS into a stable compass, with a data-driven steering model that maps the available sensor streams to control commands. When sensor data is bad the system relies more on the heading reference; when visual cues are good the learned model takes more control. The system navigated several in-the-wild urban locations under varying lighting, traffic, pedestrian density and weather, placing 2nd overall.",
    ],
    gallery: [
      {
        type: "image",
        src: "static/media/earthrover_mission.jpg",
        caption: "Mission overview.",
      },
      {
        type: "image",
        src: "static/media/earthrover_robot.jpg",
        caption: "The EarthRover robot.",
        portrait: true,
      },
    ],
  },

  /* ---------------------------------------------------------------- aerial */
  {
    id: "agipix",
    theme: "aerial",
    year: 2026,
    venue: "ICUAS 2026",
    title: "AgiPIX: Bridging Simulation and Reality in Indoor Aerial Inspection",
    short: "AgiPIX",
    authors: [
      P("kuruppu"),
      A("Juan Jose Garcia"),
      A("Changda Tian"),
      P("suomela"),
      A("Panos Trahanias"),
      A("Adriana Tapus"),
      P("kamarainen"),
    ],
    supervisor: "kamarainen",
    links: {
      arxiv: "https://arxiv.org/abs/2604.08009",
      page: "https://sasakuruppuarachchi.github.io/agipix/",
      code: "https://github.com/sasakuruppuarachchi/agipix",
    },
    media: {
      type: "video",
      src: "static/media/agipix.mp4",
      poster: "static/media/agipix.jpg",
    },
    tldr:
      "An open, compact, actively sensed drone whose containerized ROS 2 autonomy stack runs unchanged in Isaac Sim and on real hardware.",
    abstractLabel: "Overview",
    abstract: [
      "AgiPIX is an open, compact, actively sensed aerial robotics platform for indoor autonomy and critical-asset inspection. The same ROS 2 containerized autonomy stack runs in Isaac Sim and on real hardware, enabling fast and reproducible sim-to-real transfer.",
    ],
    highlights: [
      "Sim-to-real deployability: identical ROS 2 containers and configs in Isaac Sim and on hardware, with zero code changes.",
      "Open source: full bill of materials, CAD, simulation assets and the containerized ROS 2 stack.",
      "Modular autonomy: perception, state estimation, mapping, planning, PX4 interface and logging as decoupled nodes.",
      "Small form factor: compact 438 × 372 mm frame with protected sensing for narrow industrial spaces.",
      "Sensor suite: 3D LiDAR, RGB camera and IMU in a LiDAR-inertial-visual stack for mapping and exploration.",
    ],
    gallery: [
      {
        type: "image",
        src: "static/media/agipix_sim.jpg",
        caption: "Digital twin in Isaac Sim.",
      },
      {
        type: "image",
        src: "static/media/agipix_real.jpg",
        caption: "The physical platform runs the identical autonomy stack.",
      },
    ],
    youtube: [{ id: "__Awe89ndag", title: "AgiPIX video presentation" }],
  },
  {
    id: "emblio",
    theme: "aerial",
    year: 2025,
    venue: "Ongoing work · 2025",
    title: "Extended Model-Based Learned Inertial Odometry",
    short: "Learned Inertial Odometry",
    authors: [P("kuruppu"), P("kamarainen")],
    supervisor: "kamarainen",
    links: {
      page: "https://sasakuruppuarachchi.github.io/posts.html",
    },
    media: {
      type: "video",
      src: "static/media/emblio.mp4",
      poster: "static/media/emblio.jpg",
    },
    tldr:
      "IMU-only drone odometry that knows the physics: feeding full quadrotor dynamics, including body-frame torques, to the network cuts relative error by up to 61% on unseen trajectories.",
    abstractLabel: "Overview",
    abstract: [
      "Accurate state estimation is at the heart of agile drone flight. Cameras fail in low light, at high speed or in textureless environments, while inertial odometry from IMU data alone is lightweight and robust but drifts over time due to sensor noise and bias.",
      "We propose a learning-based inertial odometry algorithm that integrates the full quadrotor dynamics, including body-frame torques, as model inputs. A Temporal Convolutional Network predicts short-term positional displacements from IMU and thrust data, which are fused by an Extended Kalman Filter for continuous pose estimation. Validated on the Blackbird and DIDO flight datasets and deployed on a real racing quadrotor, the method outperforms prior state-of-the-art inertial odometry on unseen trajectories, with up to 61% lower relative error than the original learned inertial odometry baseline.",
    ],
    youtube: [{ id: "IsjZ-TeqXPM", title: "Extended Model-Based Learned Inertial Odometry" }],
  },

  /* -------------------------------------------------------------------- 3d */
  {
    id: "ags-mesh",
    theme: "3d",
    year: 2025,
    venue: "3DV 2025",
    title:
      "AGS-Mesh: Adaptive Gaussian Splatting and Meshing with Geometric Priors for Indoor Room Reconstruction Using Smartphones",
    short: "AGS-Mesh",
    authors: [
      P("ren"),
      A("Matias Turkulainen", "https://maturk.github.io"),
      A("Jiepeng Wang", "https://jiepengwang.github.io"),
      A("Otto Seiskari", "https://oseiskar.github.io"),
      A("Iaroslav Melekhov", "https://imelekhov.com"),
      A("Juho Kannala", "https://users.aalto.fi/~kannalj1/"),
      P("rahtu"),
    ],
    supervisor: "rahtu",
    links: {
      arxiv: "https://arxiv.org/abs/2411.19271",
      page: "https://xuqianren.github.io/ags_mesh_website/",
      code: "https://github.com/XuqianRen/AGS_Mesh",
    },
    media: {
      type: "video",
      src: "static/media/agsmesh.mp4",
      poster: "static/media/agsmesh.jpg",
    },
    tldr:
      "Accurate room-scale meshes from a smartphone: Gaussian splatting that adaptively trusts or ignores noisy depth and normal priors.",
    abstract: [
      "Geometric priors are often used to enhance 3D reconstruction. With many smartphones featuring low-resolution depth sensors and the prevalence of off-the-shelf monocular geometry estimators, incorporating geometric priors as regularization signals has become common in 3D vision tasks. However, the accuracy of depth estimates from mobile devices is typically poor for highly detailed geometry, and monocular estimators often suffer from poor multi-view consistency and precision.",
      "In this work, we propose an approach for joint surface depth and normal refinement of Gaussian Splatting methods for accurate 3D reconstruction of indoor scenes. We develop supervision strategies that adaptively filter low-quality depth and normal estimates by comparing the consistency of the priors during optimization. We mitigate regularization in regions where prior estimates have high uncertainty or ambiguities. Our filtering strategy and optimization design demonstrate significant improvements in both mesh estimation and novel-view synthesis for both 3D and 2D Gaussian Splatting-based methods on challenging indoor room datasets.",
      "Furthermore, we explore the use of alternative meshing strategies for finer geometry extraction. We develop a scale-aware meshing strategy inspired by TSDF and octree-based isosurface extraction, which recovers finer details from Gaussian models compared to other commonly used open-source meshing tools.",
    ],
    youtube: [{ id: "6S8PkssvS7Y", title: "Video overview" }],
  },
  {
    id: "dn-splatter",
    theme: "3d",
    year: 2025,
    venue: "WACV 2025",
    title: "DN-Splatter: Depth and Normal Priors for Gaussian Splatting and Meshing",
    short: "DN-Splatter",
    authors: [
      A("Matias Turkulainen", "https://maturk.github.io", "*"),
      P("ren", "*"),
      A("Iaroslav Melekhov", "https://imelekhov.com"),
      A("Otto Seiskari", "https://oseiskar.github.io"),
      P("rahtu"),
      A("Juho Kannala", "https://users.aalto.fi/~kannalj1/"),
    ],
    note: "* equal contribution",
    supervisor: "rahtu",
    links: {
      arxiv: "https://arxiv.org/abs/2403.17822",
      page: "https://maturk.github.io/dn-splatter/",
      code: "https://github.com/maturk/dn-splatter",
    },
    media: {
      type: "video",
      src: "static/media/dnsplatter_unicorn.mp4",
      poster: "static/media/dnsplatter_unicorn.jpg",
      portrait: true,
    },
    tldr:
      "Depth and normal cues make 3D Gaussian splatting work on casually captured indoor scenes, and let meshes be extracted directly from the Gaussians.",
    abstract: [
      "3D Gaussian splatting, a novel differentiable rendering technique, has achieved state-of-the-art novel view synthesis results with high rendering speeds and relatively low training times. However, its performance on scenes commonly seen in indoor datasets is poor due to the lack of geometric constraints during optimization.",
      "We extend 3D Gaussian splatting with depth and normal cues to tackle challenging indoor datasets and showcase techniques for efficient mesh extraction, an important downstream application. Specifically, we regularize the optimization procedure with depth information, enforce local smoothness of nearby Gaussians, and use the geometry of the 3D Gaussians supervised by normal cues to achieve better alignment with the true scene geometry. We improve depth estimation and novel view synthesis results over baselines and show how this simple yet effective regularization technique can be used to directly extract meshes from the Gaussian representation yielding more physically accurate reconstructions on indoor scenes.",
    ],
    gallery: [
      {
        type: "video",
        src: "static/media/dnsplatter_vase.mp4",
        poster: "static/media/dnsplatter_vase.jpg",
        caption: "Casual iPhone capture: Splatfacto vs. DN-Splatter.",
        portrait: true,
      },
      {
        type: "video",
        src: "static/media/dnsplatter_shark.mp4",
        poster: "static/media/dnsplatter_shark.jpg",
        caption: "Casual iPhone capture: Splatfacto vs. DN-Splatter.",
        portrait: true,
      },
    ],
  },
  {
    id: "gs-pose",
    theme: "3d",
    year: 2025,
    venue: "3DV 2025",
    title:
      "GS-Pose: Generalizable Segmentation-based 6D Object Pose Estimation with 3D Gaussian Splatting",
    short: "GS-Pose",
    authors: [
      P("cai"),
      A("Janne Heikkilä", "https://www.oulu.fi/en/researchers/janne-heikkila"),
      P("rahtu"),
    ],
    supervisor: "rahtu",
    links: {
      arxiv: "https://arxiv.org/abs/2403.10683",
      page: "https://dingdingcai.github.io/gs-pose/",
      code: "https://github.com/dingdingcai/GSPose",
    },
    media: {
      type: "video",
      src: "static/media/gspose_tracking.mp4",
      poster: "static/media/gspose_tracking.jpg",
    },
    tldr:
      "Capture a new object with a phone, then locate it and estimate its 6D pose in any image, refined by render-and-compare with 3D Gaussian splatting.",
    abstract: [
      "This paper introduces GS-Pose, an end-to-end framework for locating and estimating the 6D pose of objects. GS-Pose begins with a set of posed RGB images of a previously unseen object and builds three distinct representations stored in a database. At inference, GS-Pose operates sequentially by locating the object in the input image, estimating its initial 6D pose using a retrieval approach, and refining the pose with a render-and-compare method.",
      "The key insight is the application of the appropriate object representation at each stage of the process. In particular, for the refinement step, we utilize 3D Gaussian splatting, a novel differentiable rendering technique that offers high rendering speed and relatively low optimization time. Off-the-shelf toolchains and commodity hardware, such as mobile phones, can be used to capture new objects to be added to the database. Extensive evaluations on the LINEMOD and OnePose-LowTexture datasets demonstrate excellent performance, establishing the new state-of-the-art.",
    ],
    gallery: [
      {
        type: "video",
        src: "static/media/gspose.mp4",
        poster: "static/media/gspose.jpg",
        caption: "Overview: build the object database, then detect, initialize and refine the 6D pose.",
      },
    ],
    youtube: [{ id: "SnJazusDLM8", title: "Demo video" }],
  },
  {
    id: "mushroom",
    theme: "3d",
    year: 2024,
    venue: "WACV 2024",
    title:
      "MuSHRoom: Multi-Sensor Hybrid Room Dataset for Joint 3D Reconstruction and Novel View Synthesis",
    short: "MuSHRoom",
    authors: [
      P("ren"),
      A("Wenjia Wang", "https://wenjiawang0312.github.io"),
      P("cai"),
      A("Tuuli Tuominen"),
      A("Juho Kannala", "https://users.aalto.fi/~kannalj1/"),
      P("rahtu"),
    ],
    supervisor: "rahtu",
    links: {
      arxiv: "https://arxiv.org/abs/2311.02778",
      page: "https://xuqianren.github.io/publications/MuSHRoom/",
      code: "https://github.com/TUTvision/MuSHRoom",
    },
    media: {
      type: "video",
      src: "static/media/mushroom.mp4",
      poster: "static/media/mushroom.jpg",
    },
    tldr:
      "Ten real rooms captured with Kinect, iPhone and a Faro laser scanner: a benchmark for doing 3D reconstruction and photorealistic rendering together on consumer devices.",
    abstract: [
      "Metaverse technologies demand accurate, real-time, and immersive modeling on consumer-grade hardware for both non-human perception (e.g., drone/robot/autonomous car navigation) and immersive technologies like AR/VR, requiring both structural accuracy and photorealism. However, there exists a knowledge gap in how to apply geometric reconstruction and photorealism modeling (novel view synthesis) in a unified framework.",
      "To address this gap and promote the development of robust and immersive modeling and rendering with consumer-grade devices, we propose a real-world Multi-Sensor Hybrid Room Dataset (MuSHRoom). Our dataset presents exciting challenges and requires state-of-the-art methods to be cost-effective, robust to noisy data and devices, and can jointly learn 3D reconstruction and novel view synthesis instead of treating them as separate tasks, making them ideal for real-world applications. We benchmark several famous pipelines on our dataset for joint 3D mesh reconstruction and novel view synthesis. Our dataset and benchmark show great potential in promoting the improvements for fusing 3D reconstruction and high-quality rendering in a robust and computationally efficient end-to-end fashion.",
    ],
  },

  /* --------------------------------------------------------------- imaging */
  {
    id: "davide",
    theme: "imaging",
    year: 2024,
    venue: "ECCV 2024 Workshops (AIM)",
    title: "DAVIDE: Depth-Aware Video Deblurring",
    short: "DAVIDE",
    authors: [
      P("torres"),
      A("Jussi Kalliola"),
      A("Soumya Tripathy"),
      A("Erman Acar"),
      P("kamarainen"),
    ],
    supervisor: "kamarainen",
    links: {
      paper: "https://link.springer.com/chapter/10.1007/978-3-031-91838-4_10",
      arxiv: "https://arxiv.org/abs/2409.01274",
      page: "https://germanftv.github.io/DAVIDE.github.io/",
      code: "https://github.com/germanftv/DAVIDE-Benckmark",
    },
    media: {
      type: "video",
      src: "static/media/davide_robot04.mp4",
      poster: "static/media/davide_robot04.jpg",
    },
    tldr:
      "A new dataset of synchronized blurred, sharp and depth videos, and a depth-aware transformer that shows when depth helps video deblurring.",
    abstract: [
      "Video deblurring aims at recovering sharp details from a sequence of blurry frames. Despite the proliferation of depth sensors in mobile phones and the potential of depth information to guide deblurring, depth-aware deblurring has received only limited attention. In this work, we introduce the 'Depth-Aware VIdeo DEblurring' (DAVIDE) dataset to study the impact of depth information in video deblurring. The dataset comprises synchronized blurred, sharp, and depth videos.",
      "We investigate how the depth information should be injected into the existing deep RGB video deblurring models, and propose a strong baseline for depth-aware video deblurring. Our findings reveal the significance of depth information in video deblurring and provide insights into the use cases where depth cues are beneficial. In addition, our results demonstrate that while the depth improves deblurring performance, this effect diminishes when models are provided with a longer temporal context.",
    ],
    gallery: [
      {
        type: "video",
        src: "static/media/davide_farm03.mp4",
        poster: "static/media/davide_farm03.jpg",
        caption: "Dataset sample: blurred | depth | sharp.",
      },
      {
        type: "video",
        src: "static/media/davide_play_ground05.mp4",
        poster: "static/media/davide_play_ground05.jpg",
        caption: "Dataset sample: blurred | depth | sharp.",
      },
      {
        type: "video",
        src: "static/media/davide_indoors02.mp4",
        poster: "static/media/davide_indoors02.jpg",
        caption: "Dataset sample: blurred | depth | sharp.",
      },
      {
        type: "video",
        src: "static/media/davide_toy01.mp4",
        poster: "static/media/davide_toy01.jpg",
        caption: "Dataset sample: blurred | depth | sharp.",
      },
    ],
    youtube: [{ id: "l4LCy6LROL0", title: "Video results" }],
  },
];

const MEMBERS = [
  {
    ...PEOPLE.kamarainen,
    role: "Professor",
    topic: "Computer vision, robot learning & autonomous navigation",
    pi: true,
  },
  {
    ...PEOPLE.rahtu,
    role: "Professor",
    topic: "3D vision, neural rendering & object pose",
    pi: true,
  },
  { ...PEOPLE.suomela, img: "static/img/people/suomela.jpg", topic: "Learning-based robot navigation" },
  {
    ...PEOPLE.kuruppu,
    img: "static/img/people/kuruppu.jpg",
    topic: "Agile aerial robotics, odometry & navigation",
  },
  { ...PEOPLE.torres, img: "static/img/people/torres.jpg", topic: "Multi-modal image & video restoration" },
  { ...PEOPLE.cai, img: "static/img/people/cai.jpg", topic: "6D object pose estimation & tracking" },
  { ...PEOPLE.ren, img: "static/img/people/ren.jpg", topic: "Novel view synthesis & 3D reconstruction" },
  { ...PEOPLE.yang, img: "static/img/people/yang.jpg", topic: "Robot learning, imitation & offline RL" },
];
