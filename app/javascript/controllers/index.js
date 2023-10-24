// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import ListController from "./list_controller"
application.register("list", ListController)

import RandomColorsController from "./random_colors_controller"
application.register("random-colors", RandomColorsController)

import SketchController from "./sketch_controller"
application.register("sketch", SketchController)

import SwiperController from "./swiper_controller"
application.register("swiper", SwiperController)

import TabsController from "./tabs_controller"
application.register("tabs", TabsController)
