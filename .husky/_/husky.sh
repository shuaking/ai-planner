#!/usr/bin/env sh
# Husky init script
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  export husky_skip_init
  # Source user config if present
  if [ -f ~/.huskyrc ]; then
    . ~/.huskyrc
  fi
fi
