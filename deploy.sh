#!/usr/bin

HOST='*****'
USER='*****'
PASSWORD='*****'
LOCAL_PATH='public'
REMOTE_PATH='*****'

ftp -n <<EOF
open $HOST
user $USER $PASSWORD
prompt off
mkdir $REMOTE_PATH
quit
EOF

cd $LOCAL_PATH
directories=($(find [!_]* -type d))
files=($(find [!_]* -type f))
localAbsPath=$(pwd)
cd ..

for dir in ${directories[@]}; do
  ftp -n <<EOF
  open $HOST
  user $USER $PASSWORD
  prompt off
  cd $REMOTE_PATH
  mkdir $dir
  quit
EOF
done

ftp -n <<EOF
open $HOST
user $USER $PASSWORD
prompt off
lcd $localAbsPath
cd $REMOTE_PATH
mput ${files[@]}
quit
EOF

echo 'done'
