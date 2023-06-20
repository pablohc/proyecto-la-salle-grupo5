<script setup>

</script>

<template>

  <main>
    <section id="frameListaTareasId" class="frameListaTareas">
      <header>
        <nav id="menu">menu</nav>
      </header>
      <footer id="footer"></footer>
    </section>
  </main>


</template>

<style scoped>

  html, body, #app {
  height: 100%;
  margin: 0;
}
.frameListaTareas {
    width: 98vw;
    height: 96vh;
    background-color: #eeeded;
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 1%; 
  }

  #menu {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: rgb(147, 198, 243);
    font-family: sans-serif;
    width: 98vw;
    height: 6vh;
    position: sticky;
    top: 0;
    text-align: center;
  }

  #footer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: rgb(147, 198, 243);
    font-family: sans-serif;
    width: 98vw;
    height: 6vh;
    position: sticky;
    top: 98vh;
    text-align: center;
  }
  

</style>
