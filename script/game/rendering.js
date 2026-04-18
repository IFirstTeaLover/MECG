let objectsRendered = 0;
function renderObjects() {
    objectsRendered = 0;
    level.forEach(object => {
        if (!isOnScreen(object)) return;
        objectsRendered++;
        switch (object.type) {
            case 0:
                drawObject(
                object.x,
                object.y,
                object.w,
                object.h,
                object.color
        )
        break;
            case 1:
                drawImage(object.x, object.y, object.w, object.h, object.source, false, object.auto)

                if(config.performance.shaders) {
                    display.context.filter = "brightness(0) opacity(0.02)";
                    const dir = -45
                    const length = 10 //10
                    const res = 10 //10 looks phenomenal but is incredibly heavy
                    for(let i = 0; i < 10; i++) {
                        drawImage(object.x+Math.sin(dir)*(i*(res/length)), object.y+Math.cos(dir)*(i*(res/length)), object.w, object.h, object.source, false, object.auto)
                    }
                    display.context.filter = "none";
                }
                break;
            case 2:
                drawText(screenToWorldX(object.x), screenToWorldY(object.y), object.text, object.color, object.size*camera.z, 0, object.font)
                break;
            case 3:
                drawImage(object.x, object.y, object.s, object.s, "gear")
                break;
            default:
                break;
        }
    });
    if(game.renderObjectIDs) {
        level.forEach((object, i) => {
            drawText(screenToWorldX(object.x), screenToWorldY(object.y), i, "#ff0000")
        });
    }
    display.context.restore()
}

function drawHitboxes() {
    if(!game.renderHitBoxes) {return}
    level.forEach(object => {
        let color = object.ghost ? "#1c1fdb30" : "#cf1b1b"
            drawObjectWF(
                object.x,
                object.y,
                object.w,
                object.h,
                color
            )            
    });
    drawObjectWF(player.x+player.hbx, player.y+player.hby, player.w, player.h, "#cf1b1b")
}

function drawTriggers() {
    if(!game.drawTriggers) {return}
    level.forEach(object => {
        let color = "rgba(218, 33, 80, 0.4)"
        if(object.active) {
            color = "rgba(231, 18, 71, 0.72)"
        }
        if(object.type == 3) {
            drawObject(
                object.x,
                object.y,
                object.w,
                object.h,
                color
            )             
        }
           
    });
}

function isOnScreen(obj) {
    const screenW = size.screenWidth;
    const screenH = size.screenHeight;

    const w = obj.w || 0;
    const h = obj.h || 0;

    const buffer = 50;

    const screenLeft  = (obj.x + camera.x) * camera.z + screenW / 2;
    const screenRight = (obj.x + w + camera.x) * camera.z + screenW / 2;
    const screenTop   = (obj.y + camera.y) * camera.z + screenH / 2;
    const screenBot   = (obj.y + h + camera.y) * camera.z + screenH / 2;

    return screenRight > -buffer &&
           screenLeft  < screenW + buffer &&
           screenBot   > -buffer &&
           screenTop   < screenH + buffer;
}

function renderPlayer() {
    drawImage(player.x+player.ox, player.y+player.oy, 100, 100, player.texture, player.mirror)
}

function renderWater() {
    drawObject((0-camera.x) - display.canvas.width / 4, world.minHeight, display.canvas.width, display.canvas.height / 2, "#d7d43c4d")
}

//i made this real quick pls dont judge it wasnt meant to be used by anyone besides me ok?
const editorobject = {
    width: 100,
    height: 100,
    x: 0,
    y: 0
}

const damageFlashy = () => {
    return
    let tick = 0
    return () => {
        if(tick < 10) {
            const canvas = display.canvas
            const {width, height} = canvas
            drawImage(0-width/2, 0-height/2, width, height, "damage", 0, 0)
        }
        tick++
    }
}

async function damageFlash() {
    const canvas = display.canvas
    const {width, height} = canvas
    drawImage(0-width/2, 0-height/2, width, height, "damage", 0, 0)
}
