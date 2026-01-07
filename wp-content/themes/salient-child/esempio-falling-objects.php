
<section class="falling-logos-section">
  <div id="physics-container"></div>
</section>

<script>
  (() => {
    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events
    } = Matter;

    const container = document.getElementById("physics-container");
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const engine = Engine.create();
    engine.gravity.y = 1;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent"
      }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    /* BORDI */
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    /* BOTTONI */
    const buttons = [
      { text: "Startups", color: "#FFE066" },
      { text: "Fashion", color: "#FF6B6B" },
      { text: "Culture", color: "#4D96FF" },
      { text: "Design", color: "#6BCB77" },
      { text: "Tech", color: "#FFD93D" },
      { text: "Luxury", color: "#845EC2" },
      { text: "Media", color: "#00C9A7" },
      { text: "Music", color: "#F9A826" },
      { text: "Art", color: "#FF9671" },
      { text: "Branding", color: "#D65DB1" }
    ];

    const bodies = [];

    buttons.forEach((btn, i) => {
      const w = btn.text.length * 10 + 30;
      const h = 40;

      const body = Bodies.rectangle(
        Math.random() * width,
        -100 - i * 80,
        w,
        h,
        {
          restitution: 0.6,
          friction: 0.1,
          render: {
            fillStyle: btn.color,
            strokeStyle: "#000",
            lineWidth: 2
          }
        }
      );

      body.labelText = btn.text;
      bodies.push(body);
    });

    Composite.add(engine.world, bodies);

    /* MOUSE DRAG */
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    /* TESTO SOPRA I CORPI */
    const labels = bodies.map(body => {
      const el = document.createElement("div");
      el.className = "physics-label";
      el.innerText = body.labelText;
      container.appendChild(el);
      return { body, el };
    });

    Events.on(engine, "afterUpdate", () => {
      labels.forEach(({ body, el }) => {
        el.style.left = body.position.x - el.offsetWidth / 2 + "px";
        el.style.top = body.position.y - el.offsetHeight / 2 + "px";
        el.style.transform = `rotate(${body.angle}rad)`;
      });
    });
  })();

</script>

<style>
  .falling-buttons-section {
    position: relative;
    height: 100vh;
    width: 100%;
    background: #f5f5f5;
    overflow: hidden;
  }

  #physics-container {
    width: 100%;
    height: 100%;
  }

  /* etichette dei bottoni */
  .physics-label {
    position: absolute;
    pointer-events: none;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    white-space: nowrap;
  }
</style>