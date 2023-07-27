<template>
  <main class="flex min-h-screen flex-col md:flex-row">
    <section
      class="relative h-[50vh] border-grayscale-dark bg-identity-primary md:flex-1"
    >
      <IconLogo />

      <div class="pokeball"></div>
    </section>

    <div class="hidden h-screen w-2 bg-grayscale-dark md:block lg:w-4"></div>

    <section
      class="flex h-[50vh] flex-col items-center justify-center gap-6 md:h-auto md:flex-1 md:bg-pokemon-eletric"
    >
      <div
        class="hidden h-72 w-72 justify-center overflow-hidden rounded-full bg-grayscale-white px-4 pt-4 shadow-6-dp md:flex lg:h-96 lg:w-96"
      >
        <img
          src="~/assets/images/Ash.png"
          alt="pokémon protagonist"
          class="hidden md:block"
        />
      </div>
      <div class="max-w-[15.625rem] rounded bg-grayscale-white p-4 shadow-2-dp">
        <p class="body-1">
          Olá treinador(a), vamos procurar uns pokémons e com sorte você poderá
          obter um!
        </p>
      </div>

      <AtmLink to="/home" class="mx-auto">Iniciar Jornada</AtmLink>
    </section>
  </main>
</template>

<style scoped>
.pokeball {
  @apply absolute bottom-0 left-0 flex h-2 w-full translate-y-1/2 items-center justify-center bg-grayscale-dark lg:h-4;
}
.pokeball::before {
  content: "";
  @apply block h-20 w-20 rounded-full border-8 border-grayscale-dark bg-grayscale-white lg:h-32 lg:w-32 lg:border-[1rem];
}
</style>
