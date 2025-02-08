/**
 * @jest-environment jsdom
 */
import {tip} from './tip'

describe("Пример теста", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <img src="" alt="" Logo" class="img">
    <div class="tip">Всплывающая подсказка</div>`;
    tip()
  })
  test('jsdom', () => {
    const elemTip = document.querySelector(".tip");
    const img = document.querySelector(".img");
    img.click();
    expect(elemTip.classList.contains("tip-active")).toBe(true)
  })
});
