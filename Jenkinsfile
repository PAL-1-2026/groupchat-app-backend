pipeline {
    agent any

    environment {
        AWS_REGION       = 'ap-southeast-1'
        ECR_REGISTRY     = credentials('ecr-registry-url')   // contoh: 123456789.dkr.ecr.ap-southeast-1.amazonaws.com
        ECR_REPO         = 'kabw-groupchat/backend'
        IMAGE_TAG        = "build-${BUILD_NUMBER}-${GIT_COMMIT[0..6]}"
        EC2_HOST         = credentials('ec2-host')
        EC2_USER         = 'ubuntu'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG} -t ${ECR_REGISTRY}/${ECR_REPO}:latest ."
            }
        }

        stage('Push to ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh """
                        aws configure set aws_access_key_id     \$AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key \$AWS_SECRET_ACCESS_KEY
                        aws configure set region                 ${AWS_REGION}
                        aws ecr get-login-password --region ${AWS_REGION} \
                            | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                        docker push ${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${ECR_REPO}:latest
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-deploy-key', keyFileVariable: 'SSH_KEY')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${EC2_USER}@${EC2_HOST} \
                            'bash ~/deploy.sh ${IMAGE_TAG} backend'
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed successfully: ${IMAGE_TAG}"
        }
        failure {
            echo "❌ Pipeline failed. EC2 tidak diubah."
        }
        always {
            // Bersihkan image lokal agar disk tidak penuh
            sh "docker rmi ${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG} || true"
        }
    }
}
