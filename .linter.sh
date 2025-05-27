#!/bin/bash
cd /home/kavia/workspace/code-generation/resumecraft-19859-40757b34/resumecraft
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

