<template>
  <v-card
      class="mx-auto activity-card"
      outlined
      :class="{ 'elevation-12': isHovering, 'elevation-2': !isHovering }"
      style="border-radius: 10px !important;"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
  >

    <div class="image-container">
      <img class="activity-image" :src="activity.img" alt="">
    </div>

    <div class="info-container">
      <div class="activity-name">{{ activity.title }}</div>

      <div class="activity-date">
        <span class="icon data-icon"></span>
        {{ activity.activityBeginTime }}
      </div>
      <div class="activity-location">
        <span class="icon location-icon"></span>
        <span class="location">{{ activity.location}}</span>
      </div>

      <div class="price">
        <span class="symbol">￥</span>
        <span class="value">{{ activity.price }}</span>
      </div>
    </div>
  </v-card>

</template>

<script setup lang="ts">
import {PropType, ref} from 'vue';
import {Activity} from "../types";

defineProps({
  activity: {
    type: Object as PropType<Activity>,
    required: true
  }
});

const isHovering = ref(false);

</script>


<style scoped>

.activity-card {
  display: flex;
  flex-direction: row;
  height: 240px;
  width: 560px;
  overflow: visible;
  position: relative;
}


.image-container {
  flex: 0 0 auto;
  padding-left: 20px;
  position: relative;
  bottom: 24px;
}

img {
  width: 180px;
  height: 250px;
  border-radius: 10px;
}

.activity-image {
  transition: transform 0.1s ease-in-out;
}


.activity-card:hover .activity-image {
  transform: translateY(-10px);
}


.info-container {
  padding-top: 31px;
  margin-left: 35px;
}

.activity-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  width: 286px;
  height: 48px;
  font-size: 18px;
  color: #222;
  letter-spacing: 0;
  line-height: 24px;
}

.activity-date {
  margin-top: 19px;
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 14px;
  color: #999;
}

.activity-location{
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 14px;
  color: #999;
}

.data-icon{
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAAi5JREFUSA3tlU1IG0EUx3c3u0ECFdIeWpCAN6VgQXrsUUohl0LFgJgekmySkyCUgvTWHnsolEJpdpPm5tkPvHvQixe1QqE3hZJGBEEPARd209+IGzb7YbK09dSFx7yP//vPmzezM7IU8dXr9RnHcV6nUqlcPp+/CIM1Go0J27Y/JRKJxVKp9CMMo4Q5hQ/yF91u91mn05mOwkA+A+apGKMwaq1W0xRFeQPhLCChL5fL5TU3AYItMK7ZNxLrsw3DeItvXpblC8SAx1BBvId8CQexroXc68uSpCPsjs/nmndRHrgG4xgyDoeGUFfNUSEu4TxTVXWyWCyeesD2tf6yWq1ue/w9FYIqxhfIrrCVSkXH1k3TfETRB4JbIXgHafvIJXwmgA/pdHq3x+hTksnkGpiPYvSGaM03YcMxKloU+lH1IYFXocFrZ6FQaKMu3YSJPEU3JcWJBVZA/+7TvwokWhwiWtVmDz77cwITQD4H6J0fOMim3xLFrdP/n15sYIJMJmO2Wq1jEuKu4ETX9T5yMVFggmw2e4l/w1vFn+i3v8mi2mazOW5Z1kjMys852r/8OYEWsVHPIV/1A4ewHW7Xh/5bNTABx20fshUk7grONE0bvMmchGPIF4aoeCjIP9/kW5nAYa2xfqpBveEad/ls8R7s8dc+xvmVxMAxG0QWEZ8SfsGtQi4utk2kIJx/8fsO97IsCDm/4tF5wuMd92hG1XPOQ7WTy+WsKMB/f68DvwErc967V/DPSQAAAABJRU5ErkJggg==);
}

.location-icon{
  margin-top: 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAABHdJREFUSA2dlm9o1VUYx3d/3txMyxVboOxFhVqmL8SwyDD/4Iu4ltKbRSR3jP25wQQteuULozcVYnMGtfb3wtyKltAIm6gVMiRERVYpU3EqDpyEdYewe93udm+f7+F3Lufe3bsbHXju85zn+Z7ne85z/vxuoGSe1tbWVhEIBHam0+k3ga3CXo69CPs+ch0Z8jzvu4aGhhHseVsgX7Szs/PJ2dnZ/cT2IKUOJgZZgn4FhAutH99pCD+or6+/bH25eg4RJK+lUqljJKoE/IAkUWQgGAyeq62tfagExAIdHR0voF+nG0FWIknI6lldD/acFnQ97e3t77KSKL5HkFbkQGNjo8qU1SBO47gigewwpO+hP2aCz2YBnU5mRVoJJD8TS5GoAYKjDq6oqVX6E8iLNUTaE2ZzFXAl4HAhkt7e3senpqaW1NXV3c2bDefg4GDp2NjYZ5hHI5HIJYszpfM3XnvSmo+Ekm5XieLx+BrNnNN4D+xBsEeYWMomkx4fH38atQ//RvTLiGmejjCWTtcD5IDxOj/UP0z3FLIWkj/QZ0lSjm4mpv3Maqz2GvELYF9igiIzzcO5E6sUHWWpWRvf09PzFCX9gkEzxEPE1yGb6K+lfwMdhizk58oo/C1+Z691ejh1GUsYOGCdVicSic3YS4l9TZlOWD9ko7o36jORXdbv6O+x4+TeZH0exip1dE+s09EmRn/Y8RmTff1dBpOwmAyEiSTp3ESWUZXFCqh0y9ExexnltI1ZX5PNzNZbn6Otz2AcvzHJOyqDqpi7pdLp7Zo10ZwfynIGVwyJsBeZEnV1dT1HomYf/oOvc5WeqhImq4NTotL9g1Rw+pbK4TZKcB9gE0kXQDoAZoSTdH5mZuZPJvgM2E727qQ7xtrEV8hGK78p3YgM9kjv1ZzG2/UtZFsIXIJwJQM3oO8iTZA0zhngO4ivQKarqqpuyBWkM8Tgbcx4B/2LPi5L8SoP4XiRFT1aVla2qKam5m8BCvHw0rzKYVHJzoZCoSlhPQjaxQxZU39/v/arYKOUcUtSEEQAkg8VJ++XFucxeJzONxBVxmKxOhv4v5pDs5qxegRul5eX6z6ZpsOgdgh2nbxPo9Fo3r0yqCI/VGQhFeoFxrZ6h6qrqzOn2RBRa31XPgKwZHp6+se+vr4niuTMG6YiXQTWM+lf2ddWF2RXpI39BMAxgs9PTk4e56485gKL2Rz7z8HsRkaZ9NvkynrVM0QE0tQ0jD4DcCN35aS+P8UIFIekmTF6++4xXo9v1uMsTIZIHWqaYMAOkdF9he/PafbM3GzFcxtYfZuOoN8npm/UVipzPRenfuZT7gZ1XyD7iQRb0No/zfJODkb/K7oRlcuQgLnqYlw7a0U2wIA4F/MNSAYhWYP/gv5T2Li+U8R+ob8bfQvZPB+JxuVdkU3IcV0wMTHRAtkekumoHkSG6begl+H7jQm9FQ6H/7JjCul5iewgLuE7JP8KMfvlkx6mv5+V6NtTtP0nImXp7u6uTCaT+zD1N1l/YoaLZncA/wI5+QZSrZRLqQAAAABJRU5ErkJggg==);
}

.icon{
  margin-top: 1px;
  margin-right: 8px;
  display: inline-block;
  width: 12px;
  height: 13px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.location{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 260px;
}

.price{
  display: flex;
  align-items: flex-end;
  margin-top: 40px;
  color: #f25d8e;
}

.symbol{
  align-self: flex-end;
  font-size: 18px;
  line-height: 18px;
}

.value{
  margin-left: 4px;
  font-size: 28px;
  letter-spacing: 1px;
  line-height: 24px;
}


</style>