# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# THANK YOU STACKOVERFLOW !!!
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libffi-dev \
    python3-dev \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Verify pkg-config installation
RUN pkg-config --version


# Copy the requirements file into the container at /app
COPY docker_requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r docker_requirements.txt

# Copy the .env file into the container
COPY .env /app/

# Copy the rest of the working directory contents into the container at /app
COPY . /app/

# Set the GROQ_API_KEY environment variable
ENV GROQ_API_KEY=${API_KEY}

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run main.py when the container launches
CMD ["python", "main.py"]