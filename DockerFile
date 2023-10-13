FROM node:lts

WORKDIR /app

COPY . /app

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
