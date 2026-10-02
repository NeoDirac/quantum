#!/bin/bash
# Persistent dev server launcher that survives shell exits.
cd /home/z/my-project
pkill -f "next dev" 2>/dev/null
sleep 2
# Use setsid to fully detach into a new session, no controlling terminal
setsid bash -c 'cd /home/z/my-project && exec ./node_modules/.bin/next dev -p 3000' </dev/null >/home/z/my-project/dev.log 2>&1 &
echo $! > /tmp/qm-dev.pid
disown
sleep 1
echo "dev server launched, pid $(cat /tmp/qm-dev.pid)"
