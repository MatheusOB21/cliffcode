import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const clamp = THREE.MathUtils.clamp;
const smoothstep = THREE.MathUtils.smoothstep;

function roundedPath(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function createDisplayTexture(mobile, code = false) {
  const canvas = document.createElement("canvas");
  canvas.width = mobile ? 600 : 1440;
  const viewportHeight = mobile ? 1150 : 900;
  canvas.height = code ? viewportHeight : viewportHeight * 3;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const padding = mobile ? 42 : 86;
  const text = (
    value,
    x,
    y,
    size,
    color = "#deddda",
    weight = "400",
    family = "Arial",
  ) => {
    context.fillStyle = color;
    context.font = `${weight} ${size}px ${family}`;
    context.fillText(value, x, y);
  };
  const rectangle = (x, y, w, h, color, radius = 0) => {
    context.fillStyle = color;
    context.beginPath();
    context.roundRect(x, y, w, h, radius);
    context.fill();
  };
  rectangle(0, 0, width, canvas.height, "#080c10");
  if (code) {
    text("CLIFFCODE  /  STUDIO", padding, 70, mobile ? 22 : 25, "#9da5b0");
    const lines = [
      "// uma ideia ganha forma",
      "",
      "const nextChapter = {",
      '  brand: "seu negócio",',
      '  design: "com intenção",',
      '  experience: "memorável"',
      "};",
      "",
      "<YourNextChapter",
      '  createdBy="CliffCode"',
      "/> ",
    ];
    lines.forEach((line, index) => {
      if (!mobile)
        text(
          String(index + 1).padStart(2, "0"),
          padding,
          180 + index * 53,
          24,
          "#424b56",
          "400",
          "monospace",
        );
      text(
        line,
        padding + (mobile ? 0 : 68),
        180 + index * (mobile ? 65 : 53),
        mobile ? 24 : 38,
        index === 0 ? "#68727f" : index % 3 === 0 ? "#9daec4" : "#deddda",
        "400",
        "monospace",
      );
    });
    text(
      "Da primeira linha à próxima conquista.",
      padding,
      viewportHeight - 70,
      mobile ? 21 : 26,
      "#84909e",
    );
  } else {
    text("CLIFFCODE", padding, 78, mobile ? 29 : 34, "#deddda", "700");
    if (!mobile)
      text(
        "Estúdio     Projetos     Vamos conversar ↗",
        width - 540,
        76,
        23,
        "#aeb5bf",
      );
    text(
      "SEU PRÓXIMO CAPÍTULO DIGITAL",
      padding,
      mobile ? 210 : 235,
      mobile ? 18 : 22,
      "#99a3b1",
    );
    text(
      "Uma presença",
      padding,
      mobile ? 320 : 380,
      mobile ? 61 : 106,
      "#deddda",
      "600",
    );
    text(
      "à sua altura.",
      padding,
      mobile ? 395 : 495,
      mobile ? 61 : 106,
      "#deddda",
      "600",
    );
    text(
      "Design que aproxima.",
      padding,
      mobile ? 475 : 583,
      mobile ? 25 : 30,
      "#9da5af",
    );
    text(
      "Experiências que fazem crescer.",
      padding,
      mobile ? 512 : 630,
      mobile ? 25 : 30,
      "#9da5af",
    );
    rectangle(
      padding,
      mobile ? 580 : 700,
      mobile ? 310 : 330,
      68,
      "#deddda",
      34,
    );
    text(
      "Vamos criar juntos  ↗",
      padding + 30,
      mobile ? 624 : 744,
      24,
      "#080c10",
      "600",
    );
    // A sculptural graphic makes the example feel designed without external assets.
    const cx = mobile ? width * 0.6 : width * 0.81;
    const cy = mobile ? 880 : 460;
    context.save();
    context.translate(cx, cy);
    context.rotate(-0.35);
    for (let index = 0; index < 12; index++) {
      context.strokeStyle = `rgba(160,176,194,${0.12 + index * 0.045})`;
      context.lineWidth = mobile ? 10 : 13;
      context.beginPath();
      context.ellipse(0, 0, 80 + index * 7, 150 + index * 5, 0, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();
    const sectionTop = viewportHeight;
    rectangle(0, sectionTop, width, viewportHeight, "#deddda");
    text(
      "01 / PROJETOS SELECIONADOS",
      padding,
      sectionTop + 100,
      mobile ? 19 : 23,
      "#59616e",
    );
    text(
      "Ideias que",
      padding,
      sectionTop + 200,
      mobile ? 58 : 80,
      "#080c10",
      "600",
    );
    text(
      "ganham espaço.",
      padding,
      sectionTop + 275,
      mobile ? 58 : 80,
      "#080c10",
      "600",
    );
    const gap = 26;
    const cardWidth = mobile
      ? width - padding * 2
      : (width - padding * 2 - gap) / 2;
    const count = mobile ? 1 : 2;
    for (let index = 0; index < count; index++) {
      const left = padding + index * (cardWidth + gap);
      rectangle(
        left,
        sectionTop + 345,
        cardWidth,
        mobile ? 570 : 400,
        index ? "#959fa9" : "#202a34",
        20,
      );
      for (let column = 0; column < 5; column++)
        rectangle(
          left + cardWidth * 0.12 + column * cardWidth * 0.15,
          sectionTop + 420 + column * 15,
          cardWidth * 0.1,
          170 - column * 16,
          index ? "#c1c6ca" : "#536171",
          5,
        );
      text(
        index ? "AURA / ARQUITETURA" : "FORMA / DESIGN",
        left + 30,
        sectionTop + (mobile ? 850 : 690),
        mobile ? 25 : 27,
        "#f1f1ec",
        "600",
      );
    }
    const contactTop = viewportHeight * 2;
    text(
      "02 / VAMOS CONVERSAR",
      padding,
      contactTop + 150,
      mobile ? 19 : 23,
      "#99a3b1",
    );
    text(
      "Seu negócio.",
      padding,
      contactTop + 300,
      mobile ? 64 : 104,
      "#deddda",
      "600",
    );
    text(
      "Um novo nível.",
      padding,
      contactTop + 410,
      mobile ? 64 : 104,
      "#deddda",
      "600",
    );
    text(
      "Conte sua ideia. A gente constrói o próximo passo.",
      padding,
      contactTop + 500,
      mobile ? 19 : 29,
      "#9da5af",
    );
    rectangle(padding, contactTop + 575, mobile ? 350 : 410, 78, "#deddda", 39);
    text(
      "Começar meu projeto  ↗",
      padding + 35,
      contactTop + 624,
      mobile ? 24 : 29,
      "#080c10",
      "600",
    );
    text(
      "CLIFFCODE  /  DESIGN & TECNOLOGIA",
      padding,
      canvas.height - 70,
      mobile ? 19 : 25,
      "#68727f",
    );
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (!code) {
    texture.repeat.y = 1 / 3;
    texture.offset.y = 2 / 3;
  }
  return texture;
}

export default function DeviceScene({ progress = 0 }) {
  const containerRef = useRef(null);
  const progressRef = useRef(progress);
  const [fallback, setFallback] = useState(false);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    const mobilePreference = window.matchMedia("(max-width: 640px)");
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const device = new THREE.Group();
    scene.add(device);
    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    let renderer;
    let frame;
    let resizeObserver;
    let visibilityObserver;
    let visible = true;
    let websiteTexture;
    let websiteMaterial;
    let currentProgress = progressRef.current;

    const material = (options) => {
      const result = new THREE.MeshStandardMaterial(options);
      materials.add(result);
      return result;
    };
    const addMesh = (geometry, surface, position = [0, 0, 0]) => {
      geometries.add(geometry);
      materials.add(surface);
      const mesh = new THREE.Mesh(geometry, surface);
      mesh.position.set(...position);
      device.add(mesh);
      return mesh;
    };
    const roundedGeometry = (width, height, radius, depth) =>
      new THREE.ExtrudeGeometry(roundedPath(width, height, radius), {
        depth,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.018,
        bevelThickness: 0.018,
        curveSegments: 10,
      });
    const disposeDevice = () => {
      device.clear();
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      textures.forEach((item) => item.dispose());
      geometries.clear();
      materials.clear();
      textures.clear();
    };
    const buildDevice = () => {
      disposeDevice();
      const mobile = mobilePreference.matches;
      const width = mobile ? 2.72 : 7.4;
      const height = mobile ? 5.35 : 4.8;
      const centerY = mobile ? 0 : 0.5;
      const metal = material({
        color: "#8c939c",
        metalness: 0.82,
        roughness: 0.26,
      });
      const bezel = material({
        color: "#080b0f",
        metalness: 0.2,
        roughness: 0.32,
      });
      const keys = material({
        color: "#151a21",
        metalness: 0.15,
        roughness: 0.58,
      });
      addMesh(
        roundedGeometry(width, height, mobile ? 0.32 : 0.16, 0.12),
        metal,
        [0, centerY, -0.16],
      );
      addMesh(
        roundedGeometry(
          width - 0.08,
          height - 0.08,
          mobile ? 0.29 : 0.13,
          0.018,
        ),
        bezel,
        [0, centerY, -0.015],
      );
      const displayWidth = width - (mobile ? 0.18 : 0.22);
      const displayHeight = height - (mobile ? 0.2 : 0.35);
      const codeTexture = createDisplayTexture(mobile, true);
      websiteTexture = createDisplayTexture(mobile);
      textures.add(codeTexture);
      textures.add(websiteTexture);
      addMesh(
        new THREE.ShapeGeometry(
          roundedPath(displayWidth, displayHeight, mobile ? 0.23 : 0.035),
        ),
        new THREE.MeshBasicMaterial({ map: codeTexture }),
        [0, centerY + (mobile ? 0 : 0.045), 0.03],
      );
      // ShapeGeometry uses world-space UVs; normalize to display coordinates.
      const siteGeometry = new THREE.ShapeGeometry(
        roundedPath(displayWidth, displayHeight, mobile ? 0.23 : 0.035),
      );
      [Array.from(geometries).at(-1), siteGeometry].forEach((geometry) => {
        const positions = geometry.attributes.position;
        const uv = geometry.attributes.uv;
        for (let i = 0; i < uv.count; i++)
          uv.setXY(
            i,
            positions.getX(i) / displayWidth + 0.5,
            positions.getY(i) / displayHeight + 0.5,
          );
        uv.needsUpdate = true;
      });
      websiteMaterial = new THREE.MeshBasicMaterial({
        map: websiteTexture,
        transparent: true,
        opacity: 0,
      });
      addMesh(siteGeometry, websiteMaterial, [
        0,
        centerY + (mobile ? 0 : 0.045),
        0.034,
      ]);
      if (mobile) {
        addMesh(
          roundedGeometry(0.68, 0.13, 0.065, 0.015),
          bezel,
          [0, 2.46, 0.055],
        );
        addMesh(
          roundedGeometry(0.72, 0.028, 0.014, 0.002),
          material({ color: "#deddda" }),
          [0, -2.48, 0.055],
        );
      } else {
        const base = addMesh(
          roundedGeometry(7.6, 3.8, 0.2, 0.13),
          metal,
          [0, -1.96, 1.6],
        );
        base.rotation.x = -Math.PI / 2;
        const keyboardWell = addMesh(
          roundedGeometry(6.15, 1.85, 0.12, 0.022),
          bezel,
          [0, -1.795, 1.15],
        );
        keyboardWell.rotation.x = -Math.PI / 2;
        const keyGeometry = roundedGeometry(0.36, 0.27, 0.045, 0.025);
        for (let row = 0; row < 5; row++) {
          for (let column = 0; column < 14; column++) {
            const key = addMesh(keyGeometry, keys, [
              (column - 6.5) * 0.418,
              -1.757,
              0.48 + row * 0.32,
            ]);
            key.rotation.x = -Math.PI / 2;
          }
        }
        const trackpad = addMesh(
          roundedGeometry(2.25, 0.85, 0.09, 0.01),
          material({ color: "#747c86", metalness: 0.65, roughness: 0.38 }),
          [0, -1.805, 2.82],
        );
        trackpad.rotation.x = -Math.PI / 2;
        addMesh(
          new THREE.SphereGeometry(0.023, 10, 8),
          material({ color: "#314252", metalness: 0.2 }),
          [0, 2.81, 0.065],
        );
        const hinge = addMesh(
          new THREE.CylinderGeometry(0.1, 0.1, 6.45, 16),
          bezel,
          [0, -1.85, 0.05],
        );
        hinge.rotation.z = Math.PI / 2;
      }
    };
    const contextLost = (event) => {
      event.preventDefault();
      setFallback(true);
      cancelAnimationFrame(frame);
    };
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x080c10, 0);
      renderer.domElement.style.cssText =
        "display:block;width:100%;height:100%";
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      container.appendChild(renderer.domElement);
      scene.add(new THREE.HemisphereLight(0xe1e8f0, 0x323943, 3));
      const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
      keyLight.position.set(-5, 7, 8);
      scene.add(keyLight);
      const rim = new THREE.DirectionalLight(0xb2c3d8, 3);
      rim.position.set(5, 1, -3);
      scene.add(rim);
      buildDevice();
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibilityObserver.observe(container);
      mobilePreference.addEventListener("change", buildDevice);
      const render = () => {
        if (visible) {
          const mobile = mobilePreference.matches;
          const reduced = motionPreference.matches;
          currentProgress = reduced
            ? progressRef.current
            : THREE.MathUtils.lerp(currentProgress, progressRef.current, 0.095);
          const p = clamp(currentProgress, 0, 1);
          const reveal = reduced ? 1 : smoothstep(p, 0, 0.35);
          websiteMaterial.opacity = reduced ? 1 : smoothstep(p, 0.1, 0.29);
          websiteTexture.offset.y = (2 / 3) * (1 - smoothstep(p, 0.3, 0.96));
          const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          const fitDistance = Math.max(
            (mobile ? 3.9 : 7.9) / (2 * halfFov * camera.aspect),
            (mobile ? 5.3 : 6.9) / (2 * halfFov),
          );
          camera.position.set(
            0,
            mobile ? 0.12 : THREE.MathUtils.lerp(0.65, 0.2, reveal),
            fitDistance * THREE.MathUtils.lerp(1.15, 0.88, reveal),
          );
          camera.lookAt(
            0,
            mobile ? 0 : THREE.MathUtils.lerp(0.5, 0, reveal),
            mobile ? 0 : 0.6,
          );
          device.rotation.set(
            0,
            reduced
              ? 0
              : (mobile ? -0.045 : -0.07) * Math.sin(reveal * Math.PI),
            0,
          );
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
    } catch {
      setFallback(true);
    }
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      mobilePreference.removeEventListener("change", buildDevice);
      disposeDevice();
      if (renderer) {
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          contextLost,
        );
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="device-scene"
      role="img"
      aria-label="Um site nasce do código e percorre a tela de um dispositivo conforme você rola a página"
    >
      {fallback && (
        <div className="device-fallback">
          <code>CliffCode / design & tecnologia</code>
          <strong>
            Uma presença
            <br />à sua altura.
          </strong>
          <p>Da primeira ideia ao seu próximo capítulo digital.</p>
        </div>
      )}
    </div>
  );
}
