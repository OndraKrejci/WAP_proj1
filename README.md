
# WAP Projekt 1
* Autor: Ondřej Krejčí (xkrejc69)

Vypracováno s `node` ve verzi `14.19.0` a `npm`/`npx` ve verzi `6.14.8`.

Modul `tree.mjs` podle zadání obsahuje implementaci binárního stromu za použití prototypů a exportuje pouze jeho konstruktor `Tree`. Pro implementaci binárního stromu pomocí prototypů jsem vycházel z https://www.digitalocean.com/community/tutorials/js-objects-prototypes-classes a pro implementaci průchodů stromem jsem vycházel z https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/.

Prototyp `Tree` reprezentuje prázdný uzel stromu, při vložení hodnoty se prototyp objektu změní na `FullTree`, který reprezentuje uzel stromu s hodnotou. Oba prototypy obsahují definice všech požadovaných funkcí, díky tomuto je možné vyhnou se použití další podmínky ve funkci `insertValue` a v generátorech.

V modulu je také ponechán prototyp `BasicTree`, což je implementace s použitím dalších podmínek.

## Testy
Pro testy je použit testovací framework `mocha` a knihovna `chai`. Pro otestování průchodů stromem používám příklad z https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/. Testovací skript také porovnává výstup ukázkového testu ze zadání https://www.fit.vutbr.cz/study/courses/WAP/private/proj/2022/test.mjs s referenčním výstupem https://www.fit.vutbr.cz/study/courses/WAP/private/proj/2022/v%C3%BDstup. Pro tyto účely jsou dále použity moduly `path`, `url`, `child_process` a `fs`.

Pro testovací skript je nutné před prvním spuštěním stáhnout potřebné závislosti pomocí skriptu `test.sh`.
```
sh test.sh --install
sh test.sh
```

## Dokumentace
Modul je dokumentovaný pomocí **JSDoc** komentářů. Pro vygenerování dokumentace je nutné mít nainstalovaný `jsdoc`. Pro jeho stažení a následné vygenerování dokumentace slouží skript `doc.sh`.
