import React from 'react'
import Section from '@/components/Section'
import { MailIcon } from '@/components/icons'

const contacto = () => {
  return (
    <Section>
      <div
        style={{
          height: 'calc(100vh - 341px)',
        }}
      >
        <h2 className="mt-4 mb-10 text-xl uppercase font-display">
          Contact with us
        </h2>
        <p className="py-2">Don&apos;t hesitate to contact with us.</p>
        <div className="mt-5">
          <div className="flex items-center my-2">
            <a
              className="inline-block text-primary"
              href="mailto:facuregalia@rtsprogram.com"
            >
              <MailIcon />
              facuregalia@rtsprogram.com
            </a>
          </div>
          <div className="flex items-center my-2">
            <a
              className="inline-block text-primary"
              href="mailto:abelroig@rtsprogram.comm"
            >
              <MailIcon />
              abelroig@rtsprogram.com
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default contacto
