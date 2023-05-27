import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(16, GPIO.IN)

try:
        while True:
                LightLevel = GPIO.input(16)
                print("Light Level: ", LightLevel)
                time.sleep(0.5)
except KeyboardInterrupt:
        pass

GPIO.cleanup()
