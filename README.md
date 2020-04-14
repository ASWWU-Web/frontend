# Frontend

Aswwu's five sites all reside within this repository. Homepage, Mask, Jobs, Pages, and Elections. 

# The Mask

An online yearbook created by ASWWU for Walla Walla University using **Angular 5**.

Live version: [aswwu.com/mask](https://aswwu.com/mask/)

# Jobs

Site for ASWWU application forms
Live version: [aswwu.com/jobs](https://aswwu.com/jobs/)
# Elections

An online voting system created by ASWWU for Walla Walla University using **Angular 7**.

Live version: [aswwu.com/elections](https://aswwu.com/elections)

## Setup  
After you have cloned the repository, run `npm install` to install the necessary node modules.  
Once that has finished run `git submodule update --init --recursive`. This will add the necessary source files to the [shared-ng](https://github.com/ASWWU-Web/shared-ng) repository 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Because the live version of the server is run at `aswwu.com/mask` you must build the project as follows.
```
ng build -prod --base-href /mask --deploy-url /mask
```
You can also run `npm run build`.

## Further help

### Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Contact

Contact [ASWWU.webmaster@wallawalla.edu](mailto:aswwu.webmaster@wallawalla.edu) for additional information about this project.
