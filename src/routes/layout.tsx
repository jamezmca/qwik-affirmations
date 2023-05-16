import { component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$, } from '@builder.io/qwik';
import Modal from '~/components/modal';

export const MyContext = createContextId('qwik-affirmations')

export default component$(() => {
  const state = useStore({
    affirmations: [],
    openModal: false
  })

  useContextProvider(MyContext, state)

  useVisibleTask$(() => {
    if (localStorage.getItem('qwik-affirmations')) {
      state.affirmations = JSON.parse(localStorage.getItem('qwik-affirmations')).affirmations
    }
  })

  return (
    <>
      {state.openModal && <Modal />}
      <header>
        <i onClick$={() => {
          state.openModal = !state.openModal
        }} class="fa-solid fa-plus cursor-pointer"></i>
      </header>
      <main class="flex-1 flex flex-col max-w-[1200px] mx-auto w-full justify-center items-center gap-2">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
