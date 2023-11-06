FROM node:18.15

WORKDIR /app

COPY . /app

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
