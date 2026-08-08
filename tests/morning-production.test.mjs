import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const morning = await read("utro/index.html");
const home = await read("index.html");
const sitemap = await read("sitemap.xml");
const robots = await read("robots.txt");
const transition = await read("assets/js/morning-transition.js");
const css = await read("assets/css/morning.css");
const vkPixel = await read("assets/js/vk-pixel.js");
const cname = await read("CNAME");
const { buildMorningOfferUrl } = await import("../assets/js/morning-transition.js");

assert.doesNotMatch(morning, /noindex|nofollow|noarchive/i);
assert.match(morning, /<link rel="canonical" href="https:\/\/3d-arena\.ru\/utro\/">/);
assert.match(morning, /110895058/);
assert.match(morning, /3781383/);
assert.match(morning, /08:00–13:00/);
assert.match(morning, /Будни<\/p><h3>от 540 ₽<\/h3><dl><div><dt>Киберспорт<\/dt><dd>540 ₽<\/dd><\/div><div><dt>Комфорт<\/dt><dd>600 ₽/);
assert.match(morning, /Выходные<\/p><h3>от 600 ₽<\/h3><dl><div><dt>Киберспорт<\/dt><dd>600 ₽<\/dd><\/div><div><dt>Комфорт<\/dt><dd>660 ₽/);
assert.match(morning, /полной регистрации у администратора/i);
assert.match(morning, /документ, подтверждающий личность и возраст/i);
assert.match(morning, /до 50% игрового времени и пакетов, кроме ночных/i);
assert.match(morning, /Оршанская улица, 9/);
assert.match(morning, /tel:\+79259359344/);
assert.match(morning, /https:\/\/t\.me\/IIIDArena/);
assert.match(morning, /langame\.ru\/799456996_computerniy_club_3d-arena_moskva\/booking/);
assert.match(home, /data-morning-offer/);
assert.match(home, /assets\/js\/morning-transition\.js/);
assert.match(transition, /utm_source/);
assert.equal(
  buildMorningOfferUrl("?utm_source=vk_ads&utm_medium=cpc&utm_campaign=morning&utm_content=student&yclid=123"),
  "utro/?utm_source=vk_ads&utm_medium=cpc&utm_campaign=morning&utm_content=student&yclid=123"
);
assert.match(vkPixel, /hasPageView/);
assert.match(vkPixel, /top-fwz1\.mail\.ru\/js\/code\.js/);
assert.match(sitemap, /https:\/\/3d-arena\.ru\/utro\//);
assert.doesNotMatch(robots, /Disallow:\s*\/utro/i);
assert.match(css, /@media\s*\(max-width:\s*520px\)/);
assert.equal(cname.trim(), "3d-arena.ru");

console.log("morning production checks passed");
