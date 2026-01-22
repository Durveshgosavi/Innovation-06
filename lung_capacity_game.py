import pygame
import time

# Initialize pygame
pygame.init()

# Screen dimensions
screen_width = 600
screen_height = 400
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Lung Capacity Challenge")

# Colors
white = (255, 255, 255)
black = (0, 0, 0)
green = (0, 255, 0)
red = (255, 0, 0)

# Font
font_style = pygame.font.SysFont(None, 50)

def message(msg, color, y_displace=0):
    mesg = font_style.render(msg, True, color)
    screen.blit(mesg, [screen_width / 6, screen_height / 3 + y_displace])

def gameLoop():
    game_exit = False
    game_start = False
    start_time = 0
    elapsed_time = 0

    while not game_exit:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_exit = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    if not game_start:
                        game_start = True
                        start_time = time.time()
                    else:
                        game_start = False

        screen.fill(white)
        if not game_start:
            message("Press SPACE to Start/Stop Timer", black)
        else:
            elapsed_time = time.time() - start_time
            message(f"Time: {int(elapsed_time)}s", black, -50)
            message("Holding your breath...", green, 50)

        pygame.display.update()

    pygame.quit()
    quit()

gameLoop()
