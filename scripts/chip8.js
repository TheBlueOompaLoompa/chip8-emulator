import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
let cpu;

let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

window.loadEmulator = (e) => {
    let rom = e.files[0];

    rom.stream().getReader().read().then(data => {
        init(data.value);
    });
}

function init (rom) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;

    renderer.clear();

    cpu = new CPU(renderer, keyboard, speaker);

	cpu.loadSpritesIntoMemory();
	cpu.loadProgramIntoMemory(rom);
	loop = requestAnimationFrame(step);
}

function step() {
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		cpu.cycle();
	}

	loop = requestAnimationFrame(step);
}

//init();
