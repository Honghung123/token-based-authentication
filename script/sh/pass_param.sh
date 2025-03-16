# Check if a variable is passed
if [ -z "$1" ]; then
    echo "Hello, this is an another script!"  
else
    echo "Hello: $1"
fi
