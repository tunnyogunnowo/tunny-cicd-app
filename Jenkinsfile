pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = 'PLACEHOLDER'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'test -f build/index.html'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install netlify-cli'
                sh 'node_modules/.bin/netlify deploy --auth $NETLIFY_AUTH_TOKEN --site $NETLIFY_SITE_ID --prod --dir=build'
            }
        }
    }
}
