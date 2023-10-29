#!/bin/bash

# Check if Minikube is installed
if ! command -v minikube &> /dev/null
then
    echo "Minikube could not be found. Please install Minikube first."
    exit
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null
then
    echo "kubectl could not be found. Please install kubectl first."
    exit
fi

# Start Minikube
echo "Starting Minikube..."
minikube start

# Set Docker environment to Minikube's
eval $(minikube docker-env)

# Build Docker Images
echo "Building frontend Docker image..."
cd ../frontend && docker build -t frontend:latest .

echo "Building backend Docker image..."
cd ../server && docker build -t backend:latest .

# Move back to the original script location to apply k8s configurations
cd ../k8s

# Apply Kubernetes configurations
echo "Applying Kubernetes configurations..."

# For Postgres
kubectl apply -f postgres/postgres-pvc.yaml
kubectl apply -f postgres/postgres-deployment.yaml
kubectl apply -f postgres/postgres-service.yaml

# For Frontend
kubectl apply -f frontend/frontend-deployment.yaml
kubectl apply -f frontend/frontend-service.yaml

# For Backend
kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml

# Show status of the pods
echo "Waiting for pods to start..."
sleep 10  # giving it a few seconds before fetching pod statuses
kubectl get pods

# Inform the user about service URLs
echo "List of available services:"
minikube service list

echo "Deployment completed. You can access the services using the above URLs."
