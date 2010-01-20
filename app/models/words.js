var Words = Class.create
({
	AllWords:
	[
		//1
		["moderate", "maximum", "intense", "extreme"],
		["depletion", "increase", "escalation", "swell"],
		["conforming", "diverse", "separate", "sundry"],
		["malleable", "hard", "dense", "callous"],
		["miss", "achieve", "acquire", "procure"],
		//2
		["uniform", "complex", "convoluted", "variegated"],
		["apathetic", "dynamic", "charismatic", "intense"],
		["conspicuous", "imperceptible", "ephemeral", "vague"],
		["like", "loathe", "abhor", "repudiate"],
		["keep", "relinquish", "withdraw", "abdicate"],
		//3
		["disparage", "treasure", "revere", "venerate"],
		["angel", "devil", "archfiend", "hellion"],
		["egoistic", "humanitarian", "altruistic", "philanthropic"],
		["caring", "selfish", "parsimonious", "egomaniacal"],
		["bounded", "unlimited", "countless", "infinite"],
		//4
		["dominant", "powerless", "debilitated", "feeble"],
		["lethargic", "hearty", "exuberant", "affable"],
		["frivolous", "solemn", "austere", "pensive"],
		["infrequent,", "commonplace", "conventional", "familiar"],
		["disfavored", "precious", "beloved", "cherished"],
		//5
		["precise", "perfunctory", "unconcerned", "lackadaisical"],
		["perpetual", "intermittent", "infrequent", "sporadic"],
		["temporary", "permanent", "immutable", "enduring"],
		["taut", "loose", "detached", "unrestrained"],
		["exonerate", "convict", "adjudge", "imprison"],
		//6
		["condemn", "promote", "boost", "endorse"],
		["flatter", "impugn", "attack", "dispute"],
		["allowed", "taboo", "banned", "illegal"],
		["submit", "supersede", "outmode", "overrule"],
		["genuine", "superficial", "desultory", "depthless"],
		//7
		["agitate", "exhilarate", "elate", "enliven"],
		["obedient", "mischievous", "bothersome", "impish"],
		["hate", "amour", "love", "adulation"],
		["avoidance", "encounter", "confrontation", "appointment"],
		["praise", "slander", "aspersion", "depreciation"],
		//8
		["benevolence", "malice", "animosity", "grudge"],
		["veto", "sanction", "permission", "acquiescence"],
		["inferiority", "eminence", "celebrity", "prominence"],
		["irregular", "standard", "average", "common"],
		["certain", "problematic", "	ambiguous", "dubitable"],
		//9
		["unique", "archetypal", "average", "paradigmatic"],
		["morose", "humorous", "entertaining", "ribald"],
		["respectful", "irreverent", "contemptuous", "insolent"],
		["decent", "salacious", "raunchy", "lascivious"],
		["aromatic", "malodorous", "fetid", "noxious"],
		//10
		["outdated", "new", "current", "modern"],
		["rear", "vanguard", "front", "lead"],
		["neglect", "monitor", "oversee", "supervise"],
		["pupil", "tutor", "lecturer", "mentor"],
		["initiation", "termination", "discontinuation", "abort"],
		//11
		["opening ", "barrier", "boundary", "palisade"],
		["release", "harness", "channel", "secure"],
		["seek", "circumvent", "beguile", "evade"],
		["advance", "retard", "loiter", "dawdle"],
		["weaken", "strengthen", "intensify", "empower"],
		//12
		["obscure", "spotlight", "accentuate", "feature"],
		["adjourn", "convene", "assemble", "corral"],
		["overlook", "celebrate", "consecrate", "praise"],
		["compliment", "criticize", "lambaste", "disparage"],
		["undeviating ", "changeable", "capricious", "unsteady"],
		//13
		["reply", "query", "questioning", "interrogatory"],
		["learn", "educate", "indoctrinate", "instruct"],
		["disorder", "schedule", "calendar", "agenda"],
		["reply", "query", "questioning", "interrogatory"],
		["clash", "harmonize", "reconcile", "attune"],
		//14
		["happy", "upset", "disconcerted", "troubled"],
		[" gratify", "annoy", "beleaguer", "bother"],
		["preceding", "simultaneous", "coetaneous", "synchronous"],
		["uncommon", "prevalent", "typical", "frequent"],
		["hasty", "judicious", "astute", "diplomatic"],
		//15
		["impermanent", "indelible", "enduring", "ineffaceable"],
		["bounded", "vast", "astronomical", "monstrous"],
		["retreat", "pursue", "chase", "stalk"],
		["uncover", "camouflage", "becloud", "conceal"],
		["secret", "revelation", "announcement", "divulgement"],
		//16
		["exculpation", "accusation", "allegation", "incrimination"],
		["hoarding", "distribution", "apportioning", "dissemination"],
		["intentional", "inadvertent", "heedless", "unpremeditated"],
		["careless", "painstaking", "meticulous", "thorough"],
		["duty", "prerogative", "appanage", "immunity"],
		//17
		["loosen", "bond", "connect", "bind"],
		["divorce", "partnership", "affiliation", "conglomerate"],
		["distribution", "monopoly", "consortium", "proprietorship"],
		["push", "pull", "pluck", "yank"],
		["deter", "lure", "entice", "seduce"],
		//18
		["disgust", "enchant", "enrapture", "magnetize"],
		["neglect", "guard", "bulwark", "chaperon"],
		["weakness", "bastion", "mainstay", "stronghold"],
		["question", "retort", "comeback", "counter"],
		["indifference ", "obsession", "infatuation", "craze"],
		//19
		["hellish", "paradise", "heavenly", "divine"],
		["agreement", "hassle", "turmoil", "clamor"],
		["calm", "riot", "brannigan", "ruckus"],
		["reveal", "masquerade", "disguise", "impersonate"],
		["candor", "stratagem", "gimmick", "deception"],
		//20
		["refuse", "constitute", "decree", "legislate"],
		["praise", "dig", "gibe", "quip"],
		["sluggish", "abounding", "alert", "replete"],
		["pleasant", "formidable", "challenging", "puissant"],
		["stealing", "charity", "beneficence", "largesse"]
	],
	// initialize - Assign default data to the feedlist
	initialize: function() {
		var returnList = [];
		for (var i=0; i<this.AllWords.length; i++) {
			returnList[i] = this.AllWords[i];
		}
		return returnList;
	}
});