# denim

:construction:**This is a work in progress**:construction:

`denim` is a really simple terminal interface for connecting to bluetooth audio
devices using [bluez](http://www.bluez.org/).

Right now this doesn't really do anything. It has the ability to list your
connected bluetooth devices and connect one up as an audio sink when you select
it. Its missing **lots** of error handling and is missing almost all the
messaging it should have. But it does do that.

## Planned features

* Better messaging and error handling
* Automatically pour all inputs into the newly connected sink
* Add the ability to refresh the list of devices with `r`
* Possibly add the ability to connect to new devices (might be a bit out of
scope)

## Why?

This is mostly an experiment into making something with
[blessed](https://github.com/chjj/blessed). Typing out several commands to
connect to sinks and change sink inputs is also not that cool.
