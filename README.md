# Word hunt (under construction)

Word hunt is a word puzzle game that is based on 'Ordjakten' which is published daily in the swedish Newspaper, Svenska Dagbladet. The objective with the printed game is to find as many words with at least four letters (where one should be the the letter in the black square in the middle). In this version of the game, the objective is to use all nine letters to construct a valid word. To help the user, there are two different aids to facilitate the hunt for the hidden word. Each time the user uses one of these aids, the score is decreased.

![Ordjakten](docs/readme_images/ordjakten_sm.jpg)


The live link can be found here - [Word Hunt](https://andersganander.github.io/word_hunt/)

![Am I Responsive Image](docs/readme_images/wh_amiresponsive.jpg)

## Site Owner Goals 
- As a site owner i want to provide the users an exciting and smooth game experience to make them willing to return to my site.

## User Stories
- ### First time user
  - As a first time user I want to quickly understand what the game is about and how to play.

- ### Returning User
  - As a returning user I want to be able to start the game without having to read instructions.
  - As a returning user I want to have the possibility to read the instructions if i need to.

- ### Frequent User
  - As a frequent user I want to check the high score to see if i still have the highest score.
  - As a frequen user I want to try different game playing strategys to find out the best way to get a high score

## Design
The design of the application serves two main objectives. Firstly, it aims to closely replicate the aesthetic of the printed version of "Svenska Dagbladet," particularly in the way the letters are arranged within a grid. This approach not only maintains a visual connection to the traditional newspaper layout but also enhances readability and familiarity for users accustomed to the print medium. Secondly, the design prioritizes user-friendliness, especially for mobile phone users. To achieve this, the interface is intentionally minimalist, featuring intuitive icons that guide the user effortlessly through the game. The color scheme is limited to a few shades to avoid visual clutter, and the text is concise, ensuring that the gameplay is straightforward and accessible. This combination of a familiar aesthetic with a streamlined functionality makes the game engaging and easy to navigate on smaller screens.

### Colors
The number of colors has been deliberately kept to a minimum in the design. The reason behind this choice of colors is partly to promote readability and clarity through strong contrasts, such as black on white or white on black. However, it also involves leveraging the signaling value of certain colors. For instance, two of the buttons on the startup screen are green to guide first-time users to the most important functions (starting the game and reading instructions). The colors on the leaderboard are chosen to create a game-like atmosphere, utilizing colors and fonts commonly seen on high score lists. The user's score is highlighted in a bright yellow-green color to make it easy to quickly identify one's position on the list.

### Fonts

Two fonts are used in the game. Courier New is employed to evoke the feel of newspaper print and authenticity, but it is also used in the message box to provide a terminal-like appearance. For instructions and the leaderboard, the Oxanium typeface is used to give a retro-modern vibe and because it resembles fonts commonly used in many video games.


## Wireframes
Wireframes were produced using Balsamiq. Since the wireframes where made there have been several changes in the design. These are the things that were changed during the process:
- The heading ('WORD HUNT') was removed. Instead the start screen shows the grid withe words 'WORD' and 'HUNT' in it.
- The buttons for 'Start game' and 'How to play' was changed to buttons with icons and moved to the top.
- A button for showing the high score list was added.
- The user name input field has been replaced by a save dialog, which is only visible the first time the user gets a score that's greater than 0.
- The timer field was removed since the score is based completely on the time left.
- A new message field was introduced and placed between the grid and the user input letters. The message field is used for communicating to the user during the game.
- A new button for erasing the letters was added.

 <details>

 <summary>Desktop Wireframe</summary>

![Desktop Wireframe](docs/readme_images/wireframes/DT_Start.png)
![Desktop Wireframe](docs/readme_images/wireframes/DT_Instructions.png)
![Desktop Wireframe](docs/readme_images/wireframes/DT_Highscore.png)
 </details>

 <details>
    <summary>Mobile Wireframe</summary>

![Mobile Wireframe](docs/readme_images/wireframes/Mobile_Start.png)
![Mobile Wireframe](docs/readme_images/wireframes/Mobile_How_to.png)
![Mobile Wireframe](docs/readme_images/wireframes/Mobile_High_score.png)
 </details>

## Features
### Navigation / interaction

- Since the game is presented on a single page there is really no navigation (links to internal or external pages).
- At the top of the screen there is bar with control buttons which represents different actions which includes
    - Play button to start the game
    - Info button to show instructions
    - Button for showing the leaderboard

The control buttons are placed at the top of the screen, and two of them are green to make it easy for users to locate the essential functions. These buttons control which information is displayed in the center of the screen. When the instructions are being shown, and the user clicks the info button, the start screen is displayed again. The same applies to the leaderboard screen. Once the game has started, the buttons above the playing area are disabled. This is partly to prevent players from accidentally interrupting the game, but also to minimize distractions.

![General controls bar](docs/readme_images/control_bar.jpg)

### The Start Screen
The start screen is designed to make it easy to understand how to start the game and where to find more information. This facilitates both first-time users and returning players. The color choice for the buttons is also aimed at directing users' attention to the important functions. As a complement to the buttons, a message is displayed in the message box.

This design strategically enhances user engagement by simplifying the initial interaction. By clearly outlining how to begin playing and where additional details can be accessed, the start screen serves as an intuitive gateway into the game, reducing potential confusion or frustration for new users. For returning players, this familiar and straightforward layout allows for quick and easy navigation, promoting repeated use. 

<img src="docs/readme_images/WH_start_screen.jpg" alt="image" width="300" height="auto"> 

### Instructions screen

The instruction screen is divided into two parts: one briefly describes the game's purpose in three lines, and the other explains the buttons that can be used during gameplay. The rationale behind this layout is to make it easy to understand how to play. This structured approach to the instruction screen ensures that players can quickly grasp the essentials of the game.  

<img src="docs/readme_images/WH_instructions_screen.jpg" alt="image" width="300" height="auto"> 

### The Game Screen
 When the start icon is clicked, the game begins. A word is randomly selected, its letters are shuffled, and placed on the game board and the game control buttons are enabled. The score displayed above starts counting down from 300. When a user clicks on a letter on the game board, that letter is copied to the first available slot in the row below. The letter on the game board is marked with a distinctive background color to help the user easily see which letters remain to be used. The user now has several options available to assist in finding the sought-after word:

<b>Blender button:</b> Shuffles the letters on the game board, resulting in a deduction of 25 points from the score. When this is done, the background color also changes so that the correct letters are matched with the right background color.<br>
<b>Next letter button:</b> Places a letter in the correct position in the row below the game board.
Users can also choose to clear all the letters in the row below. When this action is taken, the background color of the corresponding letters on the game board also changes.

<img src="docs/readme_images/WH_game_screen_1.jpg" alt="image" width="300" height="auto"> 
<!--![Game screen image]()--> 

During the game, messages are displayed in the message box to enhance the sense of presence and interactivity. The game ends when the score drops to 0 or when the user enters the correct word and presses enter. The following events then occur:

- A message is shown in the message box indicating whether the correct word has been found.
- If the correct word has been entered, it is highlighted in green.
- If the incorrect word is entered, the correct word is displayed.
- The leaderboard is shown.
- If the word is correct and the score is sufficiently high, the user's name and score are displayed on the leaderboard in a distinct color.
- If the score is the user's highest, a dialogue box appears, allowing the user to save their score with a name. When the user returns to the game, the last saved name and score are loaded and compared against the randomly generated leaderboard. If the user's previous score is still competitive, the leaderboard is updated.

<img src="docs/readme_images/WH_game_screen_2.jpg" alt="image" width="300" height="auto"> 

  
### High score screen
The leaderboard screen features a clear and simple design with a black background and a retro-inspired font, reminiscent of old-school computer games. When the page is loaded for the first time, the leaderboard is created. Scores are randomly generated for a list of 10 names, and the list is formed. Concurrently, the user's saved name and score are retrieved from local storage. If the score is sufficiently high, the list is updated to include the user's name. The dynamic generation of scores adds an element of unpredictability and freshness each time the game is started, keeping the leaderboard exciting and competitive.

<img src="docs/readme_images/WH_leaderboard_screen.jpg" alt="image" width="300" height="auto"> 


## Testing

### Validator Testing
- #### HTML
    - The site was tested with W3C Markup Validation Service, without any errors.

- #### CSS
    -  The site was tested with W3C CSS Validator, without any errors.

- #### Javascript
JSHint was used for validating the javascript code. When running it with the checkbox for New Javascript features (ES 6) checked it showed two warning, which were both fixed
Missing semicolon
Unused variable


#### Accessibility 
  The site was tested for accessibility with Ligthouse and got a high score

![Lighthouse score](docs/readme_images/WH_lighthouse.jpg)


### User story testing
The tests has been done with Chrome on macOs. The images represents how the site look on a mobile phone. Depending on screen size and resolution it may look different on other devices, but the content and the functionality should be the same.

![Feature testing 1](docs/readme_images/tests_1.jpg)
![Feature testing 2](docs/readme_images/tests_2.jpg)
![Feature testing 3](docs/readme_images/tests_3.jpg)
![Feature testing 4](docs/readme_images/tests_4.jpg)
![Feature testing 5](docs/readme_images/tests_5.jpg)


![Feature testing]()

### Browser Testing
The site were tested in the most common browsers (Chrome, Firefox, Safari and Edge). Alll browsers were tested on mac os except for Edge which was tested on Windows 11.

![Browser testing]()

    
### Device Testing
In addition to testing responsiness with Am I Responsive and Responsinator the site has also been tested on some ios devices (iPhone SE and iPad). 

### Fixed Bugs
All the bugs that were discovered during the development have been documented using GitHub issues. 
![List of fixed bugs]()

###

### Known Bugs

## Future improvements
[text](https://github.com/andersganander/word_hunt/issues/73)
## Technologies Used

### Languages
- HTML5
- CSS
- Javascript

### Frameworks - Libraries - Programs Used
#### Development and design
- [Balsamiq](https://balsamiq.com/) - Used to create wireframes for desktop and mobile.
- [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/) - Used for overall development and testing.
- [GitHub](https://github.com/) - Used for version control and hosting.

#### Testing
- [Am I Responsive](http://ami.responsivedesign.is/) - Used to verify responsiveness.
- [Lighthouse](https://developer.chrome.com/docs/devtools/) - Used for overall accessibility testing from dev tools.
- [Responsinator](http://www.responsinator.com/) - Used to verify responsiveness.
- [W3C](https://www.w3.org/) - Used for validation of HTML and CSS.

## Deployment

The project was deployed using GitHub pages. The steps to deploy using GitHub pages are:

1. Go to the repository on GitHub.com
2. Select 'Settings' near the top right corner of the page.
3. Select 'Pages' from the menu bar on the left of the page.
4. Click the drop down below 'Source' and select 'Deploy from a Branch'.
5. Click the drop down under 'Branch' and select 'main'.
5. Click 'Save'.

At the top of the page there's a section describing the status of your site and when it was last deployed. 
To remove the project from auto-deploy:
Repeat step 1-2 in the above list, then click the drop down under 'Branch' and select 'None'. Click 'Save'.

The live link can be found here - [REAL Records](https://andersganander.github.io/word_hunt/)

## Credits

### Content
All texts was written by the site owner.

### Media
#### Photos
- Photo

#### Fonts and icons
- 
- [Font Awesome](https://fontawesome.com/) used for icons in footer and event cards
- [Freefavicon](https://www.freefavicon.com/) used for creating favicon.


### Resources Used
- Love Math walkthrough for inspiration, especially how to .
- [Mmdn](https://developer.mozilla.org/en-US/docs/Web/CSS) for tutorials, tips and tricks
- [w3Schools] (https://www.w3schools.com/) for tutorials, tips and tricks. 


## Acknowledgments
-