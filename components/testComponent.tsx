"use client"

import {useEffect, useState} from "react"

export default function TestComponent() {
    const [state, setState] = useState("")
    let arr = ["elo"]
    const [objState, setObjState] = useState<any[]>([])
    useEffect(() => {
        console.log("changed")
    }, [state])

    useEffect(() => {
        console.log("changed 2")
    }, [objState])

    return (
        <div>
            <button onClick={() => setState((prev) => prev + "e")}></button>
            <button
                onClick={() =>
                    setObjState((prev) => [...prev, {name: "siema"}])
                }
            ></button>
            <h1>siema</h1>
            <h1>siema</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                autem totam quasi veritatis quas perspiciatis deserunt!
                Repudiandae ut natus temporibus ipsa eos dignissimos nesciunt
                possimus vero voluptatem placeat nulla reiciendis tempora,
                doloribus corrupti dolorem autem, similique molestiae impedit
                nihil dolore debitis incidunt provident distinctio omnis. Amet
                facere maiores repudiandae impedit voluptas dolor nisi? Aliquam
                ipsa incidunt ut nisi ad ex cupiditate corrupti placeat numquam.
                Soluta, possimus. Iste, fugit veritatis. Quae nulla cum iusto
                quod repellendus exercitationem. Ipsa nihil magnam hic officiis
                inventore dolorum sequi architecto maxime, earum expedita,
                laborum sunt. Labore, nobis aliquam. Minus nisi corrupti autem
                modi quos tempora amet architecto enim dolores ducimus corporis
                repudiandae incidunt commodi velit labore, sunt fugit illum
                libero consequuntur temporibus consequatur dolorum voluptates
                eius. Doloremque qui atque corrupti ex quis ipsa earum
                asperiores ipsum beatae non eius quo minima vel voluptas
                voluptatibus magni iste, laborum possimus accusamus tempore
                repellat ratione! Accusamus adipisci veniam ut amet animi quia
                ad iusto sed modi itaque libero nostrum quisquam nisi quidem
                necessitatibus quas vero velit consectetur perspiciatis, ipsam
                deserunt? Voluptate nulla, aliquid dolores explicabo, iusto
                libero quibusdam iure itaque laudantium fuga facilis nobis?
                Adipisci fugit laborum voluptas recusandae? Molestiae rem ipsam
                recusandae quaerat aut, esse sunt, eos maiores corporis omnis
                obcaecati adipisci velit explicabo ratione ut quasi quas quam
                nobis libero cupiditate. Et, quibusdam! Beatae alias obcaecati
                dolor dolorem! A tenetur repellendus exercitationem doloremque
                amet veritatis nam cupiditate quaerat inventore tempora,
                reiciendis distinctio quod accusantium officiis iure quis.
                Voluptatem deleniti rem sapiente pariatur dolore impedit
                asperiores magni eligendi, optio doloremque explicabo totam
                deserunt molestiae nesciunt nemo numquam, veritatis ducimus!
                Velit aspernatur nobis debitis numquam voluptatibus, nam nemo a,
                alias commodi est ex aut blanditiis soluta repudiandae delectus
                cupiditate itaque architecto provident nostrum vel
                necessitatibus quisquam? Nesciunt adipisci optio nisi sed
                voluptates totam sit perferendis saepe error id ipsa rem,
                obcaecati, repudiandae molestiae tenetur impedit voluptate quas.
                Sit similique exercitationem ad repellat illo pariatur non qui
                nam at soluta aperiam, velit voluptatem repudiandae dignissimos.
                Quam blanditiis voluptate, distinctio veritatis qui voluptatibus
                quasi eum unde cumque ad ullam magnam nesciunt beatae molestiae
                eius culpa ea. Saepe expedita natus illo laborum voluptates.
                Corrupti, impedit nihil, temporibus eveniet nemo similique
                debitis dolor, id nostrum sint minima asperiores! Ipsa, facilis
                et omnis consectetur, quos culpa, at aut dolores alias quasi
                consequuntur neque? Dicta sint hic cumque dignissimos ullam
                consequuntur distinctio blanditiis repellendus in minima harum,
                soluta laboriosam, voluptas nemo quibusdam. Excepturi laboriosam
                quaerat modi, sunt repudiandae earum maiores beatae esse dolore?
                At beatae fugiat quidem voluptas maiores, dolores quisquam nulla
                reiciendis, placeat magnam ea amet pariatur officia mollitia ut
                voluptatibus eius illo perferendis porro? At rem facere autem
                suscipit dicta error corrupti debitis quibusdam! Impedit enim
                autem magni eveniet, optio odio error tempora soluta asperiores
                velit provident quaerat ullam distinctio quos itaque fugiat
                molestiae quo repudiandae nemo magnam eligendi, aspernatur ipsa
                praesentium nesciunt? Laboriosam minima incidunt similique
                dolore. Quidem deleniti nihil quod cum voluptates quae nemo
                laborum nesciunt vitae architecto laudantium deserunt illum
                officia expedita quisquam sit, cupiditate veniam voluptatum
                ipsum vero eveniet explicabo distinctio. Laudantium ad
                dignissimos nam officiis, eligendi vero incidunt quaerat sed qui
                dolorem, dolorum et reiciendis cupiditate excepturi nobis
                repellendus doloremque minima optio inventore voluptatibus
                tempora maxime ipsa? Repellat cumque voluptatum dolores
                temporibus, facere in deserunt dolorum eius nesciunt,
                repellendus asperiores doloribus libero modi, veniam laboriosam
                tenetur! Ducimus, dolor mollitia? Beatae, ex rerum consequatur
                laboriosam repellendus illo aut eligendi a atque in illum, quos
                ad minima, ut eveniet assumenda ab? Culpa quam incidunt at
                quaerat cupiditate perspiciatis molestiae atque ipsa. Sed vitae
                placeat, incidunt non iste labore esse illum impedit temporibus,
                consectetur doloremque delectus eligendi exercitationem id, sit
                ad a. Culpa incidunt a maiores mollitia? Cum aperiam harum quod
                quasi placeat ipsa doloribus, explicabo mollitia itaque ut
                voluptate necessitatibus non odit odio at, nobis illo ducimus
                sit maiores, hic error dolores aspernatur repellendus repellat.
                Aspernatur dignissimos libero aliquid consequuntur facere fuga
                officia illum error enim ex assumenda nostrum nobis impedit,
                eveniet quod odit quasi exercitationem dicta sint, culpa,
                repudiandae quas esse cupiditate cum! Cupiditate praesentium ab
                molestias, sit minus, quisquam, sapiente rem quod impedit eaque
                quidem facilis inventore sint aliquam laborum nobis animi optio
                quos. Saepe cupiditate consectetur fuga, itaque ex optio
                repellendus ipsam dolor aliquid vero magni odit nobis quod animi
                hic placeat quam assumenda eos amet error perspiciatis
                recusandae ullam. Labore laborum asperiores ipsam deleniti
                exercitationem a aliquid recusandae, qui mollitia dolorem magnam
                tenetur delectus dolorum corrupti temporibus quisquam nihil
                reiciendis. Accusamus labore, nostrum expedita voluptates
                aliquam voluptate quas totam dolore qui, quod asperiores nobis
                ad corrupti blanditiis quidem commodi voluptatibus ratione id
                aspernatur? Molestiae inventore recusandae sit deleniti
                necessitatibus nulla temporibus accusamus voluptatum
                consequuntur ab. Error sequi, et cupiditate odio natus eaque
                quaerat dolorum velit quae culpa, fugiat ratione at obcaecati
                laboriosam harum in sit eos cumque ab! Tempora itaque, aliquam
                voluptatibus, neque sit nesciunt molestiae omnis similique
                dignissimos, libero suscipit? Aspernatur voluptatibus ad eaque
                labore laboriosam obcaecati, quis quidem assumenda magni
                pariatur. Dicta officia nihil ad blanditiis deleniti eos
                tempora, obcaecati perferendis doloremque, voluptate
                consequuntur non dolore cum incidunt assumenda quam. Omnis
                laborum tempore commodi itaque optio accusamus pariatur enim
                vero. Eius numquam nostrum sit modi, provident aut tenetur
                dignissimos cum et. Labore quia voluptate inventore nulla
                dignissimos sed corrupti, porro reiciendis! Quasi, nam
                accusantium quae explicabo aliquid, aut facere praesentium
                consequatur in illo quibusdam quod, nostrum laboriosam
                voluptates possimus harum esse ab! Soluta quaerat tenetur
                dignissimos non, illum sequi ullam perspiciatis facilis
                sapiente. Deserunt, optio repellendus consequuntur sit explicabo
                itaque ad doloribus, laboriosam autem, ipsa quas minus illo modi
                inventore laborum exercitationem natus recusandae ipsam commodi
                aliquam nam odit cumque facere delectus. Pariatur accusantium ex
                odio tempore fugit voluptate veniam quas architecto perspiciatis
                vel, assumenda quos eum autem. Veritatis fuga ab repellendus
                cum, vel facilis distinctio quaerat quae rem, reiciendis
                expedita voluptatem eaque dolores tempore quasi? Aliquam
                commodi, deleniti numquam doloribus molestias ad magni nemo
                similique sed enim esse recusandae optio, et in corporis amet
                ipsam adipisci perspiciatis quia tenetur laboriosam! Doloribus
                voluptatem dolorem libero adipisci nulla odit fugit quos laborum
                reiciendis. Esse.
            </p>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                molestias id, aperiam labore repellendus, odit quod adipisci non
                asperiores repellat fugiat neque cum alias ipsam iste ducimus
                expedita reiciendis culpa commodi. Placeat error libero
                repellendus ad aperiam consectetur quos mollitia, dolor fuga,
                earum odio cupiditate ratione quod nisi blanditiis sint.
            </p>
        </div>
    )
}
