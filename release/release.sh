#IMPORTANT: MODIFY PATH TO GIT REPO BEFORE USE
#Commit and Push to remote repo first
#Run Below command to create release file
#bash release.sh

#Change this path according to your local git repo
cd /Applications/MAMP/htdocs/testing/wp-content/plugins/big-ninja

#Get latest source
git archive -o release/unbuilt-big-ninja.zip master
cd release
unzip unbuilt-big-ninja.zip -d big-ninja

#Build frontend
cd big-ninja/apps
npm install
npm run build

#Remove inappropriate source
cd ../..
rm -rf big-ninja/apps
rm -rf big-ninja/release
rm big-ninja.zip

#Zip the result
zip -r big-ninja.zip big-ninja

#Remove building files
rm unbuilt-big-ninja.zip
rm -rf big-ninja