openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out ca.key
openssl req -new -x509 -days 360 -key ca.key -subj "/CN=Test CA/O=000_Test_Certificates" -out ca.crt

openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out server.key
openssl req -new -key server.key -subj "/CN=localhost/O=000_Test_Certificates" -out server.csr
openssl x509 -days 360 -req -in server.csr -CAcreateserial -CA ca.crt -CAkey ca.key -out server.crt

openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out client.key
openssl req -new -key client.key -subj "/CN=testuser1/O=000_Test_Certificates/UID=testuser1" -out client.csr
openssl x509 -days 360 -req -in client.csr -CAcreateserial -CA ca.crt -CAkey ca.key -out client.crt
openssl pkcs12 -in client.crt -inkey client.key -export -password pass: -out client.p12

pause