<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte'
  </script>
  
  <Footer>
    <FooterCopyright href="/" by="Ultorcs™" year={2023} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <FooterLink href="/about">Om Ultorcs</FooterLink>
      <FooterLink href="/contact">Kontakt</FooterLink>
    </FooterLinkGroup>
  </Footer>