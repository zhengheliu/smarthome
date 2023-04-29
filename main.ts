// 门: AnalogPin.P8
// 窗: AnalogPin.P9

function openCurtain () {
    if (curtainOperating) {
        return
    }
    curtainOperating = true
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("Open Curtain", 0, 0)
    while (degree < 100) {
        degree += 5
        degree = Math.min(degree, 100)
        pins.servoWritePin(AnalogPin.P9, degree)
        control.waitMicros(200 * 1000)
    }
    music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
    curtainOperating = false
}
function closeCurtain () {
    if (curtainOperating) {
        return
    }
    curtainOperating = true
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("Close Curtain", 0, 0)
    while (degree > 0) {
        degree += 0 - 5
        degree = Math.max(degree, 0)
        pins.servoWritePin(AnalogPin.P9, degree)
        control.waitMicros(200 * 1000)
    }
    music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
    curtainOperating = false
}
input.onButtonPressed(Button.A, function () {
    openCurtain()
})
input.onButtonPressed(Button.B, function () {
    closeCurtain()
})
let curtainOperating = false
let degree = 0
pins.servoWritePin(AnalogPin.P9, degree)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
I2C_LCD1602.BacklightOff()
music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
basic.forever(function () {
	
})
