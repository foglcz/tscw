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

Debugging of .ts files
======================
On some platforms (definitely on Windows + node.js stack), there might be tsc command output stripped when invoked from
external tools, like tscw. This results into the fact that development, as easied by tscw utility, will be much harder.
This is cause by this bug_.

The result is not-to-be-seen at first glance. Generally, you will see where the compilation stopped, but sometimes
you might not see the reason for your .ts file not compiling. This is just wrong. Consider this output of tscw:

.. image:: https://raw.github.com/foglcz/pull-support/master/tscw/with-bug.png

Not much information, right? In order to fix it, update your tsc.js file (found in AppData/npm/node_modules/typescript
on windows stack). Find the line (21 267), which reads::

    quit: process.exit

And replace it with following code::

    quit: function (exitCode) {
              if (typeof exitCode === "undefined") { exitCode = 0; }
              process.on('exit', function () {
                  process.exit(exitCode);
              });
          }

The full diff of tsc.js file can be found here_.

If implemented correctly, the message will be fixed into this:

.. image:: https://raw.github.com/foglcz/pull-support/master/tscw/without-bug.png

That's better, right?

.. _bug: http://typescript.codeplex.com/SourceControl/network/forks/foglcz/typescript/contribution/3532
.. _here: https://gist.github.com/0d34d8fe3da0c02777c1

Author & License
================

Created `-w love` by Pavel Ptacek, licensed under WTFPL license. Full license can be found here: http://sam.zoy.org/wtfpl/COPYING

**note**: The WTFPL license means, that you can do whatever you want with the tscw package.