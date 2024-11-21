import json

import pytest
from backend.config import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_voice_input_valid(client):
    data = {"input": "Hello"}
    response = client.post("/voice", json=data)
    assert response.status_code == 200
    json_data = response.json
    assert "response" in json_data
    assert isinstance(json_data["response"], str)
    assert json_data["response"]



def test_voice_input_invalid(client):
    data = {"input": ""}
    response = client.post("/voice", json=data)
    json_data = response.json
    assert "error" in json_data