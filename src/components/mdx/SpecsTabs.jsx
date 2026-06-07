import { useId, useState } from 'react';

const tabs = [
	{
		label: '2026',
		specs: [
			{ label: 'CPU', value: <a href="https://www.amd.com/en/product/8456">AMD Ryzen™ 5 3600 Processor</a> },
			{
				label: 'Mainboard',
				value: (
					<a href="https://www.asus.com/de/motherboards-components/motherboards/tuf-gaming/tuf-gaming-b550m-plus/">
						Asus TUF GAMING B550M-PLUS
					</a>
				),
			},
			{
				label: 'RAM',
				value: (
					<a href="https://gskill.com/en/product/f4-3200c14d-16gfx">16 GB G.Skill Flare X DDR4-3200 CL14 Dual Kit</a>
				),
			},
			{
				label: 'Cooler / Fans',
				value: (
					<>
						<a href="https://noctua.at/de/nh-l9a-am4">NH-L9a-AM4</a> ·{' '}
						<a href="https://noctua.at/de/nf-s12a-pwm">NF-S12A PWM</a>
					</>
				),
			},
			{
				label: 'Graphics',
				value: (
					<a href="https://www.zotac.com/de/product/graphics_card/zotac-geforce-gtx-1060-amp-edition">
						ZOTAC GeForce GTX 1060 AMP! 6GB
					</a>
				),
			},
			{
				label: 'Harddrive',
				value: (
					<>
						<a href="https://documents.westerndigital.com/content/dam/doc-library/de_de/assets/public/western-digital/product/internal-drives/wd-black-ssd/data-sheet-wd-black-sn850x-nvme-ssd.pdf">
							WD Black SN850X
						</a>{' '}
						(1 TB NVMe M.2) ·{' '}
						<a href="https://www.samsung.com/de/memory-storage/970-evo-nvme-m-2-ssd/MZ-V7E500BW/">Samsung 970 EVO</a>{' '}
						(500 GB M.2)
					</>
				),
			},
			{ label: 'PSU', value: 'be quiet! Straight Power E9 580W' },
			{
				label: 'Monitor',
				value: (
					<a href="https://www.dell.com/de-de/shop/dell-27-plus-qhd-usb-c-monitor-s2725dc/apd/210-bsrl/monitore-und-monitorzubeh%C3%B6r">
						Dell 27 Plus QHD-USB-C-Monitor – S2725DC
					</a>
				),
			},
			{ label: 'OS', value: 'Windows 11 Pro (64bit)' },
		],
	},
	{
		label: '2018',
		specs: [
			{
				label: 'CPU',
				value: (
					<a href="https://www.amd.com/en/products/processors/desktops/ryzen/2000-series/amd-ryzen-5-2600.html">
						AMD Ryzen™ 5 2600 Processor
					</a>
				),
			},
			{
				label: 'Mainboard',
				value: (
					<a href="https://www.asus.com/de/motherboards-components/motherboards/prime/prime-b350m-a/">
						Asus Prime B350M-A
					</a>
				),
			},
			{ label: 'RAM', value: '8 GB DDR4-2666' },
			{
				label: 'Cooler / Fans',
				value: (
					<>
						<a href="https://noctua.at/de/nh-l9a-am4">NH-L9a-AM4</a> ·{' '}
						<a href="https://noctua.at/de/nf-s12a-pwm">NF-S12A PWM</a>
					</>
				),
			},
			{
				label: 'Graphics',
				value: (
					<a href="https://www.zotac.com/de/product/graphics_card/zotac-geforce-gtx-1060-amp-edition">
						ZOTAC GeForce GTX 1060 AMP! 6GB
					</a>
				),
			},
			{
				label: 'Harddrive',
				value: (
					<a href="https://www.samsung.com/de/memory-storage/860-evo-sata-3-2-5-ssd/MZ-76E500BEU/">
						Samsung 860 EVO 500 GB SATA SSD
					</a>
				),
			},
			{ label: 'PSU', value: 'be quiet! Straight Power E9 580W' },
			{
				label: 'Monitor',
				value: <a href="https://www.samsung.com/de/support/model/LT27A550EW/EN/">Samsung TV+Monitor T27A550</a>,
			},
			{ label: 'OS', value: 'Windows 10 Pro (64bit)' },
		],
	},
	{
		label: '2006',
		specs: [
			{ label: 'CPU', value: 'AMD AthlonXP 2600+' },
			{ label: 'Mainboard', value: 'ECS Elitegroup KM400-M' },
			{ label: 'RAM', value: '1 GB MTD PC400' },
			{
				label: 'Cooler',
				value: <a href="https://www.silentpcreview.com/article130-page1.html">Swiftech MCX 462-V</a>,
			},
			{
				label: 'Graphics',
				value: <a href="https://www.gigabyte.com/Graphics-Card/GV-N68128DH#ov">Gigabyte GV-N68128DH Geforce 6800</a>,
			},
			{ label: 'Harddrive', value: 'Seagate 120GB ST3120026A' },
			{ label: 'PSU', value: 'TSP 420 P4 Ultra Silent TripleFan' },
			{ label: 'Monitor', value: "Iiyama ProLite E431S-B 17'' TFT" },
			{ label: 'OS', value: <a href="https://www.gentoo.org">Gentoo Linux</a> },
			{ label: 'Sound', value: 'CreativeLabs Soundblaster Audigy 4' },
			{
				label: 'Optical Drive',
				value: <a href="https://www.lg.com/de/service-produkt/lg-GSA-4167B">LG GSA-4167B DVD-Writer</a>,
			},
			{ label: 'Cardreader', value: 'Cooltek 7-in-1 with 2 Front-USB-ports' },
		],
	},
];

export default function SpecsTabs() {
	const [active, setActive] = useState(0);
	const uid = useId();
	const tabId = (i) => `${uid}-tab-${i}`;
	const panelId = `${uid}-panel`;

	function handleKeyDown(e) {
		let next = active;
		if (e.key === 'ArrowRight') {
			next = (active + 1) % tabs.length;
		} else if (e.key === 'ArrowLeft') {
			next = (active - 1 + tabs.length) % tabs.length;
		} else if (e.key === 'Home') {
			next = 0;
		} else if (e.key === 'End') {
			next = tabs.length - 1;
		} else {
			return;
		}
		e.preventDefault();
		setActive(next);
		document.getElementById(tabId(next))?.focus();
	}

	return (
		<div className="specs-tabs">
			<div className="specs-tab-bar" role="tablist">
				{tabs.map((tab, i) => (
					<button
						key={tab.label}
						type="button"
						role="tab"
						id={tabId(i)}
						aria-selected={active === i}
						aria-controls={panelId}
						tabIndex={active === i ? 0 : -1}
						className={`specs-tab-btn${active === i ? ' active' : ''}`}
						onClick={() => setActive(i)}
						onKeyDown={handleKeyDown}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div id={panelId} className="specs-tab-panel" role="tabpanel" aria-labelledby={tabId(active)} tabIndex={0}>
				<dl className="specs-list">
					{tabs[active].specs.map(({ label, value }) => (
						<div key={label} className="specs-row">
							<dt>{label}</dt>
							<dd>{value}</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	);
}
