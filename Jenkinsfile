pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '68e1814d-453a-4bcf-b988-33ce0bf80471'
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
