<template>
  <div class="anonymousDashboardBox">
    <h1>The crypto plateform<br />who follows you</h1>
    <ul>
      <li>
        <div class="left">
          <v-img
            src="@/assets/chartArrowUp.png"
            width="3rem"
            height="3rem"
            contain
          />
        </div>
        <div class="right">
          <h2>Follow the Rate</h2>
          <p>
            Stay update about crypto market evolution thanks to a precise
            tracking system
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <v-img
            src="@/assets/layoutFluid.png"
            width="3rem"
            height="3rem"
            contain
          />
        </div>
        <div class="right">
          <h2>News</h2>
          <p>
            Everything you need to know about the crypto news in the world is
            here
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <v-img
            src="@/assets/diamond.png"
            width="3rem"
            height="3rem"
            contain
          />
        </div>
        <div class="right">
          <h2>Premium</h2>
          <p>
            Everyone that have a registred account can access to premium
            features
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AnonymousDashboard",
};
</script>

<style lang="scss" scoped>
.anonymousDashboardBox {
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 75px;
  }

  ul {
    margin-top: 4rem;
    list-style: none;

    li {
      max-width: 25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;

      .left {
        background: #72c4ff;
        border-radius: 50%;
        padding: 1.5rem;
        overflow: none;
        margin-right: 2.5rem;
      }

      h2 {
        font-style: normal;
        font-weight: normal;
        font-size: 30px;
        line-height: 45px;
      }

      p {
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 27px;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 35px;
      line-height: 45px;
    }

    ul {
      li {
        h2 {
          font-size: 20px;
          line-height: 30px;
        }

        p {
          font-size: 15px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
