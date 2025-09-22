#!/bin/bash
cd /home/kavia/workspace/code-generation/unified-login-portal-7998-8007/login_portal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

