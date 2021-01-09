
#!/bin/bash

# set values for certificate DNs
# note: CN is set to different values in the sections below
ORG="000_Test_Certificates"

# set values that the commands will share
VALID_DAYS=360
CA_KEY=ca.key
CA_CERT=ca.crt
CLIENT_KEY=client.key
CLIENT_CERT=client.crt
CLIENT_CSR=client.csr
CLIENT_P12=client.p12
SERVER_KEY=server.key
SERVER_CERT=server.crt
SERVER_CSR=server.csr
KEY_BITS=2048

echo
echo "Create CA certificate..."
CN="Test CA"
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out ca.key
openssl req -new -x509 -days 360 -key ca.key -subj "/CN=Test CA/O=000_Test_Certificates" -out ca.crt
echo "Done."

echo
echo "Creating Server certificate..."
CN="localhost"
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out server.key
openssl req -new -key server.key -subj "/CN=localhost/O=000_Test_Certificates" -out server.csr
openssl x509 -days 360 -req -in server.csr -CAcreateserial -CA ca.crt -CAkey ca.key -out server.crt
echo "Done."

echo
echo "Creating Client certificate..."
CN="Test User 1"
USER_ID="testuser1"
P12_PASSWORD=
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out client.key
openssl req -new -key client.key -subj "/CN=testuser1/O=000_Test_Certificates/UID=testuser1" -out client.csr
openssl x509 -days 360 -req -in client.csr -CAcreateserial -CA ca.crt -CAkey ca.key -out client.crt
openssl pkcs12 -in client.crt -inkey client.key -export -password pass: -out client.p12
echo "Done."

echo
echo "----- Don't forget to open your browser and install your $CA_CERT and $CLIENT_P12 certificates -----"
echo