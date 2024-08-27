var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies;
        Body = Matter.Body;

let engine;
let world;
let objectarray = [];

var w = window.innerWidth;
var h = window.innerHeight; 

function setup() {
    // create an engine
    engine = Engine.create();
    world = engine.world;

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: w,
            height: h,
            showAngleIndicator: false,
            wireframes: true,
            wireframeBackground: '#1C1C1C',
            background: '#1C1C1C'
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    objectarray[0] = Bodies.circle(w/2, h/5, 100,{Render:{ fillStyle:'#5b58a9', friction: 0.1}});
    console.log(objectarray[0])
    objectarray[1] = containerPolygon(w/2, h/4, sides=100, radius=w/2.5, { isStatic: true, Render:{ fillStyle:'#662d91'}});

    /*var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
    });*/

    Composite.add(world, [/*stack,*/ objectarray[1], objectarray[0]]);


    

    var mouse1 = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse1,
            constraint: {
                stiffness: .2,
                render: {
                    visible: false
                }
            }
        });
    Composite.add(world, mouseConstraint)

    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: w, y: w }
    });
    

    var allBodies = Composite.allBodies(world);

    for (var i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 100, y: render.bounds.min.y - 500 },
            max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
        };
    }
    
}


function containerPolygon(x, y, sides, radius, options) {
    const width = options.width || 20; delete options.width;
    const extraLength = options.extraLength || 1.15; delete options.extraLength;
    const initialRotation = options.initialRotation || 0; delete options.initialRotation;
  
    const theta = 2 * Math.PI / sides;
    const sideLength = 2 * radius * theta/2 * extraLength;
  
    const parts = [];
    for (let i = 0; i < sides; i++) {
      // We'll build thin sides and then translate + rotate them appropriately.
      const body = Bodies.rectangle(0, 0, sideLength, width, {Render:{fillstyle:'#662d91'}});
      
      Body.rotate(body, i * theta);
      Body.translate(body, {x: radius * Math.sin(i * theta), y: -radius * Math.cos(i * theta)});
      parts.push(body);
    }
    const ret = Body.create(options);
    Body.setParts(ret, parts);
    if (initialRotation) {
      Body.rotate(ret, initialRotation);
    }
    Body.translate(ret, {x: x, y: y});
    console.log(ret)
  
    return ret;
  }

function newBall(){
    code=code;
}

