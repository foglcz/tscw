Typescript watch compiler
=========================
The current typescript's implementation of -w parameter is broken. Here's a little utility to fix that.

Usage
=====
Normal usage::

    npm install -g tscw
    tscw <parameters which you would use with tsc>

The parameters which you pass to tscw are transparently sent to tsc compiler.

TSCW does only one thing - watches for file changes and compiles (correctly) as it would under normal conditions.
Problem solved. Temporarily.

Created `-w love` by Pavel Ptacek, licensed under WTFPL license. Full license can be found here: http://sam.zoy.org/wtfpl/COPYING