# FriendLyst

Welcome to FriendLyst! A full stack Facebook clone that utilizes a Flask Python backend and a React Redux frontend.

Here on FriendLyst you can search users to add as a friend, create posts, write comments, and send live messages.\

[Click here to view FriendLyst Live Site](http://friendlyst-onrender.com)

**Please see below links to project Wiki:**\
[Feature List](https://github.com/aekimx/FriendLyst/wiki/FriendLyst-Features-List)\
[Database Schema](https://github.com/aekimx/FriendLyst/wiki/FriendLyst-DB-Schema)\
[Redux Store State Shape](https://github.com/aekimx/AKBnB/wiki/Redux-Store-Shape)

**This project is built with:**\
JavaScript\
PostgreSQL\
Flask\
Python\
React\
Redux\
Socket.IO\
AWS S3\
HTML\
CSS

# Check out FriendLyst's features! #

## Getting Started: Sign Up or Log in as Demo User ##
* You can get started on FriendLyst by signing up or clicking either Demo Users.
* The log in button is disabled if there is nothing inputted in the fields.
* If the credentials are invalid, you will see a dynamic error show up top.\
INSERT GIF HERE

## View and Update Your User Profile and view Friend Profiles ##
* You can view your user profile after signing in by clicking the top right on the screen, or clicking on your name in one of the posts or comments.
* You can view any user's user profiles by clicking on their name in your feed.
* You can update your user profile and edit your bio and location by clicking the camera button and the gear button, respectively! \
INSERT GIF HERE

## Create Posts and View Post Detail ##
* You can create a post to update your status or send a photo update to your friends either on the home page, or your user profile page.
* This feature utilizes AWS S3 for cloud storage for photos.
* You can click the image button to upload a photo (with the accepted image extensions like JPG, JPEG, or PNG). Make sure to include a caption, otherwise the post button will be disabled.
* If you hit the length validation, the error message will show up in red to the right.
* After posting, you should see the newly created post on your feed or user profile, with the ability to like, comment, edit, or delete!
* Clicking on any post will take you to the post detail page, where you can see a larger version of the photo and all the associated comments. \
INSERT GIF HERE

## Edit or Delete Posts ##
* You can edit or delete your own posts by clicking the gear and the x on the top right, respectively.
* You can only edit or delete your own post, so the options are conditionally rendered.
* Clicking update will open a modal with the pre-populated caption. You cannot currently edit the photo at this time.
* Error validations will show up if you try to remove the caption, as captions are required, or if the caption is too long.
* Clicking delete will open a confirmation modal.  \
INSERT GIF HERE

## Create, Edit, Delete Comments ##
* You can write a comment on any post, including your own, as you see it on your feed, your user profile, or someone ele's user profile.
* You can edit and delete your own comments, with the drop down menu conditionally rendered on your comments only.
* Clicking edit comment will open a modal with the pre-populated comment for user ease.
* All comments contain a length validation, and an error message will appear if the comment does not meet it.
* Clicking delete comment will open a confirmation modal. \
INSERT GIF HERE

## Search Users ##
* You can search for users at the top left of your screen to view their profiles.
* The search is case insensitive, and does not require the full name to be inputted for maximum search flexibiilty.
* Users that are your friends and are not your friends will both show up in the search results. \
INSERT GIF HERE

## Add or Remove Friend, Accept or Deny Friend Request ##
* You can add a user by clicking on to their profile after searching and by clicking the add friend button.
* The Request will be sitting in their Friend Requests page to the left, where they will have the option to accept or deny your request.
* That user's posts will not show up in your feed until they have accepted the request.
* You can go onto any existing friend's page and remove them as a friend. You have the option to re-add them as a friend, but their posts will be removed from your feed. \
INSERT GIF HERE

## Send A Message ##
* You can send a direct message to your friends! Upon adding a user as a friend, a DM channel is created for you in your message tab to the left. Removing a friend will delete that channel.
* This feature utilizes Socket.IO for instant live chat.
* You can test the live messaging feature by opening a new Incognito window and logging in as the other Demo User. (Demo user 1 is Demo Lition, and Demo user 2 is Aileen Kim ) \
INSERT GIF HERE
