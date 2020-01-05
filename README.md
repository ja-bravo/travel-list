# Travel Bucket List

Small app that allows you to track places you want to visit and things you want to do there.

Integration with Unsplash API. Example access key included.

# Images

![Login Screen](https://i.imgur.com/oz9X4rQ.png)
![Home](https://i.imgur.com/5VQUVGH.png)
![Destination Detail](https://i.imgur.com/4AXmmog.png)
![Change cover screen](https://i.imgur.com/ALAL2hd.png)

# How to deploy

From the server folder run

```
$ docker build . -f Dockerfile  {YOUR_NAME}:latest && docker push {YOUR_NAME}
```

and then

```
$ docker pull  {YOUR_NAME}:latest
$ docker run -d -p 9988:3005 --name travel-app -v /var/databases/travel-app:/usr/app/database  {YOUR_NAME}:latest travel-app
```
