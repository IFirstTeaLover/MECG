//first render everything 
//then go over each object and apply a mask
//wow

const stains = []

let stainsDirty = true;

function defineStain(x, y, w, h, source) {
    drawPersistentImage(x, y, w, h, source, 0, 0);
}

function renderStains() {
    const sx = (0 + camera.x) * camera.z + size.screenWidth / 2;
    const sy = (0 + camera.y) * camera.z + size.screenHeight / 2;
    const sw = persistentCanvas.width * camera.z;
    const sh = persistentCanvas.height * camera.z;
    display.context.drawImage(persistentCanvas, sx, sy, sw, sh);
}
let clippy = true

function createClippingMap() {        
    const ctx = display.context
    ctx.save()
    ctx.beginPath()

    level.forEach(object => {
        const {x, y, w, h, ghost, type} = object
        if(!ghost && type == 0) {
           ctx.rect(screenToWorldX(x), screenToWorldY(y), w * camera.z, h * camera.z)
        }
    })

    if(clippy) {
        ctx.clip()
    }
}

addEventListener("keydown", (e) => {
    return
    defineStain(player.x, player.y+100, 100, 100, "blood")

        if(e.key == "c") {
        clippy = !clippy
    }
})

function spawnBloodPool(x, y, size) {
    if(!config.gameplay.gore) return;
    for(let i = 0; i < size; i++) {
        defineStain(x + random(-20, -5), y+60  + random(-5, 5), 50, 20, "blood")
    }
}