# Contributor's Guide
If you're reading this, you probably want to contribute to a BITS-ACM project. We are glad that you are here and would like you to get started ASAP. This guide is meant to make sure everyone adhere's to the same coding styles and writes code that is readable by others trying to contribute to the project. Also note that this will be an opinionated guide, some of the advice given here might not be universal. If you think you have a better resource or a better way of doing things, please file an issue and open a PR.

## Intro to Open Source
Read this section if this is your first time contributing to an open source project. You can skip this section if you have contributed to open source projects before or you feel confident about GitHub's pull request model. 

To be able to contribute to this project, you need to be familiar with atleast: 
 - Using basic git commands like: `git clone`, `git push`, `git pull`, `git commit`, etc. You can learn the other commands on the go as you write more code and make more mistakes.
 - GitHub's Pull Request model: https://guides.github.com/introduction/flow/

Before you write any code, do the following: 
- **Fork this repo**. You can find the fork button on the top right side of the screen. Forking means creating a copy of someone's repo so that you can extend upon it while giving them proper credits.
- **Clone your fork** of this repo to your local machine:  
`git clone https://github.com/<YOUR USERNAME>/<REPO NAME>`
- Next, go the repo's directory, and **create a new branch** with a suitable name. You can do this using  
`git branch <branch_name>`.
- **Checkout to this newly created branch**:  
`git checkout <branch_name>`.

**All the code you write must be inside this branch**. Once you are done writing code for a particular step/issue, push this branch. 

```git push origin <branch_name>```

Next, open the repo on GitHub and create a pull request with the branch you just pushed. Inside the PR, explain everything you have done in clear and concise statements, preferably in present tense. 

Inform the maintainers on Slack. You can then wait for a maintainer to review your pull request. If everything is correct, the maintainer will accept your changes and merge your PR! Congrats!

If there is a better pull request than your pull request then your pull request will be rejected. In case you must continue working by pulling the code that was accepted and build your code for the next step on top of that.

To pull the accepted code, you must sync your fork with the main repository

```git remote add upstream https://github.com/bitsacm/bluff.git```

Check if upstream was added correctly by running `git remote -v`. You should see  
```
origin  https://github.com/<YOUR USERNAME>/<REPO NAME>.git (fetch)  
origin  https://github.com/<YOUR USERNAME>/<REPO NAME>.git (push)   
upstream     https://github.com/bitsacm/bluff.git (fetch)  
upstream     https://github.com/bitsacm/bluff.git (push)
```  

Now, sync your repo  
```git fetch upstream```

Make sure you are on master branch  
```git checkout master```

Merge the  incoming changes  
```git pull upstream master```

Force push the changes to your fork to keep the working tree clean and avoid conflicts. (-f flag is for force push)  
```git push -f origin master```

Now you are ready to continue to the next step. Now create a new branch, all of the code for this step must go into this branch.

## Coding Styles
While we do not expect you to strongly adhere to the style guides of the language you are writing code in, we do expect some uniformity in the code. As this project is going to be built by the community from scratch, it will be difficult to maintain if contributors do not follow the same styles. 
A few pointers to help you adhere to this project's coding styles:
- Give your variables, functions, etc readable names and avoid single letter variable names. A good tip is that names should be self documenting.
- Follow casing conventions. For example, in Python it is convention to name functions in `pascal_case` and name classes in `CamelCase`.
- JS coding conventions are available at: https://www.w3schools.com/js/js_conventions.asp
- Use consistent code formatting. 
- If adding blank lines makes your code readable, please do. But do not include unnecessary blank lines. 

An easy way to ensure you are writing well formatted code is installing a linter and a formatter. A few good ones are:

- **Python**: Black (Code formatter), flake8 (Code linter)
- **JavaScript**: Prettier (Code formatter), JSLint (Code linter), ESLint (we have provided the configuration file for ESLint in the repository)

If you are using VSCode (highly recommended), you can install these as extensions. 

## Documenting Your Code

Writing good documentation is an important part of contributing to open source projects. It is essential for code to have good documentation because other developers (including you in the future) building upon your code must be able to read and understand it without much effort.

Some pointers for writing good documentation: 
- Documentation should not be limited to explaining a function's name and its arguments. It should explain the use cases, limitations, etc. 
- If possible include an example. 
- Write clear and concise documentation.

## Using Slack
- Before you start working on any issue, announce on a relevant channel on Slack that you are going to be working on it. 
- If at any point you get stuck, do not be afraid to ask for help on Slack. This project is meant to help you learn and foster communication in the community. If you cannot understand a part of someone else's code, feel free to ask about it on Slack. 
- Do not make pull requests with broken code. It is important that you test all the code you write, including edge cases. If you would like someone to take a look at the code you have written, ask a maintainer on Slack to do it. 

In short, it is important to communicate on Slack to successfully contribute to this project. 

Happy hacking :)
