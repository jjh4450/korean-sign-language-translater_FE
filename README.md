# 수어 번역 [사이트](https://o-lange.jeje.work/)
## O-LANGE (audiO into LANGuaGE)

이 프로젝트는 한국어를 한국 수어로 변환해주는 시범 사이트입니다. 과거에 파이썬 기반으로 제작된 애플리케이션의 접근성 한계를 개선하기 위해, 브라우저에서 작동하는 웹 페이지로 제작되었습니다. 형태소 분리 및 한국 수어 조회 과정은 [백엔드 레포지토리](https://github.com/jjh4450/korean-sign-language-translater_BE_public)에서 확인할 수 있습니다.

> 사이트는 아래 두 주소를 통해 접속할 수 있습니다. <br>
> https://수어번역기.jeje.work <br>
> https://o-lange.jeje.work

## 폴더 구조
```
korean-sign-language-translater_FE-main/
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
├── public/
│   ├── favicon.ico
│   └── preview_img.webp
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── buildweb.lottie
    │   ├── ji_munja.svg
    │   ├── preimage.lottie
    │   ├── service_motion.lottie
    │   ├── sound_wave.lottie
    │   ├── sound_wave2.lottie
    │   ├── subtitle_motion.lottie
    │   └── use_motion.lottie
    ├── components/
    │   └── ServerResponse.jsx
    ├── pages/
    │   ├── About.jsx
    │   ├── Home.jsx
    │   ├── NotFound.jsx
    │   └── Showcase/
    │       ├── ControlPanel.jsx
    │       ├── Showcase.jsx
    │       ├── TextInput.jsx
    │       ├── VideoPlayer.jsx
    │       └── store.js
    └── widgets/
        ├── Footer.jsx
        └── Header.jsx
```
- `public`: 정적으로 사용되는 파비콘과 같은 이미지가 저장됩니다.
- `src`: 빌드 시 사용되는 모든 파일이 저장됩니다.
  - `assets`: 빌드 시 동적으로 사용되는 에셋들이 저장됩니다.
  - `components`: 프로젝트에서 공통적으로 사용되는 컴포넌트가 들어 있습니다.
  - `pages`: 사이트의 각각의 페이지에 대한 소스코드입니다. 현재 프로젝트에는 About, Home, Showcase와 404 페이지가 구성되어 있습니다.
  - `widgets`: 헤더와 푸터가 들어 있습니다.

## 설치 및 실행 방법

### 1. 저장소 클론
> 본 프로젝트의 패키지 관리자는 기본적으로 pnpm입니다. [설치 방법](https://pnpm.io/installation)

```bash
git clone https://github.com/your-repo/korean-sign-language-translater_FE-main.git
cd korean-sign-language-translater_FE-main
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm run dev
```

### 4. 빌드

```bash
pnpm run build
```

### 5. 배포

```bash
pnpm run deploy
```

## 기여 방법
기여는 항상 환영합니다! 문제를 발견하거나 개선 사항이 있으면 이슈를 남겨주세요. 기여 절차는 다음과 같습니다:

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다. (`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋합니다. (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다. (`git push origin feature/amazing-feature`)
5. 풀 리퀘스트를 생성합니다.

---